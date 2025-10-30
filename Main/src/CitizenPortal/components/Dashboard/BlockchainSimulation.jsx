import React, { useState } from 'react';
import './BlockchainSimulation.css';

export default function BlockchainSimulation() {
    const [blocks, setBlocks] = useState([
        { id: 1, data: 'Genesis Block', hash: '0000abcd', verified: true },
        { id: 2, data: 'Tax Return Submitted', hash: '0000bcde', verified: true },
        { id: 3, data: 'Profile Updated', hash: '0000cdef', verified: true },
    ]);

    const addBlock = () => {
        const newId = blocks.length + 1;
        const newBlock = {
            id: newId,
            data: `New Citizen Activity #${newId}`,
            hash: Math.random().toString(36).substring(2, 10),
            verified: true
        };
        setBlocks([...blocks, newBlock]);
    };

    return (
        <div className="blockchain-container card slide-in-up">
            <div className="blockchain-header">
                <h2>Blockchain Ledger</h2>
                <button className="add-block-btn" onClick={addBlock}>Add Block</button>
            </div>

            <div className="blockchain-chain">
                {blocks.map((block, index) => (
                    <div key={index} className="block">
                        <div className="block-id">Block #{block.id}</div>
                        <div className="block-data">{block.data}</div>
                        <div className="block-hash">{block.hash}</div>
                        <div className="block-status">✅ Verified</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
