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
    const [blockchain, setBlockchain] = useState(() => {
        const saved = localStorage.getItem("blockchainLedger");
        if (saved) {
            const parsed = JSON.parse(saved);
            // If it's the old format, convert to new format
            if (parsed.length > 0 && !parsed[0].index) {
                return createGenesisBlock(); // Start fresh with new format
            }
            return parsed;
        }
        return createGenesisBlock();
    });

    const [isChainValid, setIsChainValid] = useState(true);

    // Create genesis block
    function createGenesisBlock() {
        return [{
            index: 0,
            timestamp: new Date().toLocaleString(),
            data: {
                type: "system",
                message: "Genesis Block - ZRA Tax System Started"
            },
            previousHash: "0",
            hash: "genesis-block-hash-0000",
            nonce: 0
        }];
    }

    // persist to localStorage
    useEffect(() => {
        localStorage.setItem("blockchainLedger", JSON.stringify(blockchain));
    }, [blockchain]);

    // Simple hash function (simplified for demo)
    const calculateHash = (index, timestamp, data, previousHash, nonce) => {
        return `hash-${index}-${timestamp}-${JSON.stringify(data).substring(0, 50)}-${previousHash}-${nonce}`;
    };

    // Create new block
    const createNewBlock = (data) => {
        const previousBlock = blockchain[blockchain.length - 1];
        const newIndex = previousBlock.index + 1;
        const timestamp = new Date().toLocaleString();
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
        blockchain,
        addToBlockchain,
        clearBlockchain,
        isChainValid,
        validateChain,
        simulateTampering,
        getTaxRecordsFromBlockchain
    };

    return (
        <BlockchainContext.Provider value={value}>
            {children}
        </BlockchainContext.Provider>
    );
};