// src/components/BlockchainSim.jsx
import React, { useEffect, useState } from 'react'
import { loadChain } from '../utils/blockchain'
import './blockchain.css'

export default function BlockchainSim({ refreshKey }) {
    const [chain, setChain] = useState([])

    useEffect(() => {
        setChain(loadChain())
    }, [refreshKey])

    return (
        <div className="blockchain-sim">
            <h3>🪙 Blockchain Simulation (audit trail)</h3>
            <div className="chain-container" aria-live="polite">
                {chain.length === 0 && <div className="muted">No blocks yet — perform actions to create blocks.</div>}
                {chain.map((b) => (
                    <div className="block-card" key={b.hash}>
                        <div className="block-header">Block #{b.index}</div>
                        <div><strong>User:</strong> {b.user}</div>
                        <div><strong>Action:</strong> {b.action}</div>
                        {b.metadata && Object.keys(b.metadata).length > 0 && <div><strong>Meta:</strong> {JSON.stringify(b.metadata)}</div>}
                        <div className="small muted">Prev: {String(b.previousHash).slice(0, 12)}</div>
                        <div className="small timestamp">{new Date(b.timestamp).toLocaleString()}</div>
                        <div className="small hash">Hash: {String(b.hash).slice(0, 18)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
