import React, { createContext, useState, useEffect, useContext } from "react";

export const BlockchainContext = createContext();

// Create the custom hook
export const useBlockchain = () => {
    const context = useContext(BlockchainContext);
    if (!context) {
        throw new Error('useBlockchain must be used within a BlockchainProvider');
    }
    return context;
};

export const BlockchainProvider = ({ children }) => {
    const [blockchains, setBlockchains] = useState(() => {
        const savedZRA = localStorage.getItem("zraBlockchainLedger");
        const savedReports = localStorage.getItem("reportsBlockchainLedger");

        return {
            zra: savedZRA ? JSON.parse(savedZRA) : createGenesisBlock("ZRA Tax System"),
            reports: savedReports ? JSON.parse(savedReports) : createGenesisBlock("Reports System")
        };
    });

    const [isChainValid, setIsChainValid] = useState(true);

    // Create genesis block
    function createGenesisBlock(systemName) {
        return [{
            index: 0,
            timestamp: new Date().toLocaleString(),
            data: {
                type: "system",
                message: `Genesis Block - ${systemName} Started`
            },
            previousHash: "0",
            hash: `genesis-block-${systemName.toLowerCase()}-0000`,
            nonce: 0
        }];
    }

    // persist to localStorage
    useEffect(() => {
        localStorage.setItem("zraBlockchainLedger", JSON.stringify(blockchains.zra));
        localStorage.setItem("reportsBlockchainLedger", JSON.stringify(blockchains.reports));
    }, [blockchains]);

    const calculateHash = (index, timestamp, data, previousHash, nonce) => {
        // Defensive: ensure all are strings
        const safeData = typeof data === 'string' ? data : JSON.stringify(data || '');
        const safePrevHash = typeof previousHash === 'string' ? previousHash : String(previousHash || '0');
        return `hash-${index}-${timestamp}-${safeData.substring(0, 50)}-${safePrevHash}-${nonce}`;
    };

    // Create new block
    const createNewBlock = (data) => {
        const previousBlock = blockchain[blockchain.length - 1];
        const newIndex = previousBlock.index + 1;
        const timestamp = new Date().toISOString();
        const nonce = Math.floor(Math.random() * 1000);

        const newBlock = {
            index: newIndex,
            timestamp,
            data,
            previousHash: previousBlock.hash,
            hash: calculateHash(newIndex, timestamp, data, previousBlock.hash, nonce),
            nonce
        };

        return newBlock;
    };

    // Add a generic event/block to the chain (used by ReportsContext for events)
    const addBlock = (event, type = 'reports') => {
        const chain = type === 'zra' ? blockchains.zra : blockchains.reports;
        const previousBlock = chain[chain.length - 1];
        const newIndex = previousBlock.index + 1;
        const timestamp = new Date().toISOString();
        const nonce = Math.floor(Math.random() * 1000);

        const newBlock = {
            index: newIndex,
            timestamp,
            event,
            previousHash: previousBlock.hash,
            hash: calculateHash(newIndex, timestamp, event, previousBlock.hash, nonce),
            nonce
        };

        setBlockchains(prev => {
            const newChain = [...(type === 'zra' ? prev.zra : prev.reports), newBlock];
            validateChain(newChain);
            return {
                ...prev,
                [type]: newChain
            };
        });
    };

    const addToBlockchain = (record) => {
        const blockData = {
            type: "tax_approval",
            record: {
                id: record.id || Date.now().toString(),
                citizenName: record.citizenName,
                fileName: record.fileName,
                timestamp: record.timestamp || new Date().toLocaleString(),
                status: record.status || "Approved"
            },
            approvedBy: "ZRA Officer",
            approvedAt: new Date().toLocaleString()
        };

        const newBlock = createNewBlock(blockData);
        setBlockchain(prev => {
            const newChain = [...prev, newBlock];
            validateChain(newChain);
            return newChain;
        });
    };

    const clearBlockchain = () => {
        const genesisBlock = createGenesisBlock();
        setBlockchain(genesisBlock);
        localStorage.setItem("blockchainLedger", JSON.stringify(genesisBlock));
    };

    // Add blockchain validation function
    const validateChain = (chain = blockchain) => {
        if (chain.length <= 1) {
            setIsChainValid(true);
            return true;
        }

        for (let i = 1; i < chain.length; i++) {
            const currentBlock = chain[i];
            const previousBlock = chain[i - 1];

            // Check if previous hash matches
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.error(`Blockchain tampered at block ${i}!`);
                setIsChainValid(false);
                return false;
            }

            // Verify block hash
            const calculatedHash = calculateHash(
                currentBlock.index,
                currentBlock.timestamp,
                currentBlock.data,
                currentBlock.previousHash,
                currentBlock.nonce
            );

            if (calculatedHash !== currentBlock.hash) {
                console.error(`Block ${i} hash invalid!`);
                setIsChainValid(false);
                return false;
            }
        }

        setIsChainValid(true);
        return true;
    };

    // Add tamper simulation function
    const simulateTampering = (blockIndex) => {
        if (blockIndex >= blockchain.length || blockIndex === 0) return;

        setBlockchain(prev => {
            const tamperedChain = [...prev];
            // Change the data to simulate tampering
            tamperedChain[blockIndex] = {
                ...tamperedChain[blockIndex],
                data: {
                    ...tamperedChain[blockIndex].data,
                    record: {
                        ...tamperedChain[blockIndex].data.record,
                        status: "⚠️ TAMPERED - Record Modified"
                    }
                }
            };
            validateChain(tamperedChain);
            return tamperedChain;
        });
    };

    // Get all tax records from blockchain
    const getTaxRecordsFromBlockchain = () => {
        return blockchain
            .filter(block => block.data && block.data.type === "tax_approval")
            .map(block => ({
                ...block.data.record,
                blockIndex: block.index,
                blockTimestamp: block.timestamp,
                transactionHash: block.hash,
                approvedBy: block.data.approvedBy
            }));
    };

    const value = {
        // Reports blockchain
        chain: blockchains.reports, // legacy name for reports chain
        reportsChain: blockchains.reports,
        // ZRA blockchain
        zraChain: blockchains.zra,
        // Common functions
        addBlock,
        addToBlockchain: (record) => addBlock(record, 'zra'),
        clearBlockchain,
        isChainValid,
        validateChain,
        simulateTampering,
        getTaxRecordsFromBlockchain: () => {
            return blockchains.zra
                .filter(block => block.data && block.data.type === "tax_approval")
                .map(block => ({
                    ...block.data.record,
                    blockIndex: block.index,
                    blockTimestamp: block.timestamp,
                    transactionHash: block.hash,
                    approvedBy: block.data.approvedBy
                }));
        }
    };

    return (
        <BlockchainContext.Provider value={value}>
            {children}
        </BlockchainContext.Provider>
    );
};