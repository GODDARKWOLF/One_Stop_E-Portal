import React, { useContext, useState } from 'react';
import { useBlockchain } from '../../../SharedContext/BlockchainContext';
import { TaxContext } from '../../../SharedContext/TaxContext';
import './BlockchainViewer.css';
const BlockchainPage = () => {
    const { blockchain: rawBlockchain, isChainValid, validateChain, simulateTampering } = useBlockchain();
    // Defensive: ensure blockchain is always an array
    const blockchain = Array.isArray(rawBlockchain) ? rawBlockchain : [];
    const { deleteTaxRecord } = useContext(TaxContext);
    const [tamperedBlocks, setTamperedBlocks] = useState(new Set());

    const getBlockType = (block) => {
        if (block.index === 0) return 'genesis';
        if (block.data.type === 'tax_approval') return 'tax-record';
        return 'system';
    };

    const getBlockTitle = (block) => {
        if (block.index === 0) return 'Genesis Block';
        if (block.data.type === 'tax_approval') return 'Tax Approval Record';
        return 'System Block';
    };

    const handleDeleteRecord = (block) => {
        if (block.data.type === 'tax_approval' && block.data.record) {
            if (window.confirm(`Are you sure you want to delete the tax record for ${block.data.record.citizenName}? This action will mark the blockchain as compromised.`)) {
                deleteTaxRecord(block.data.record.id);

                // Mark this block as tampered
                setTamperedBlocks(prev => new Set(prev).add(block.index));

                // Simulate chain break
                simulateTampering(block.index);
            }
        }
    };

    const isBlockTampered = (blockIndex) => {
        return tamperedBlocks.has(blockIndex);
    };

    const getConnectionStatus = (currentBlock, nextBlock) => {
        if (!nextBlock) return 'valid';
        if (isBlockTampered(currentBlock.index) || isBlockTampered(nextBlock.index)) {
            return 'broken';
        }
        if (nextBlock.previousHash !== currentBlock.hash) {
            return 'broken';
        }
        return 'valid';
    };

    return (
        <div className="blockchain-page">
            {/* Header Section */}
            <div className="page-header">
                <div className="header-content">
                    <div className="title-section">
                        <h1>🔗 ZRA Secure Tax Ledger</h1>
                        <p className="page-subtitle">Immutable Blockchain Record of All Tax Approvals</p>
                    </div>
                    <div className="status-section">
                        <div className={`security-status ${isChainValid ? 'secure' : 'compromised'}`}>
                            <div className="status-icon">
                                {isChainValid ? '🛡️' : '🚨'}
                            </div>
                            <div className="status-info">
                                <div className="status-title">
                                    {isChainValid ? 'Ledger Secure' : 'Ledger Compromised'}
                                </div>
                                <div className="status-description">
                                    {isChainValid ? 'All records are verified and secure' : 'Tampering detected in the chain'}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => validateChain()}
                            className="validate-chain-btn"
                        >
                            🔍 Verify Entire Chain
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-info">
                        <div className="stat-number">{blockchain ? blockchain.length : 0}</div>
                        <div className="stat-label">Total Blocks</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                        <div className="stat-number">
                            {blockchain ? blockchain.filter(block => block.data && block.data.type === 'tax_approval').length : 0}
                        </div>
                        <div className="stat-label">Tax Approvals</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🔒</div>
                    <div className="stat-info">
                        <div className="stat-number">
                            {isChainValid ? '100%' : '0%'}
                        </div>
                        <div className="stat-label">Chain Integrity</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-info">
                        <div className="stat-number">{tamperedBlocks.size}</div>
                        <div className="stat-label">Tampered Blocks</div>
                    </div>
                </div>
            </div>

            {/* Educational Section */}
            <div className="educational-section">
                <div className="edu-card">
                    <h3>📖 Understanding the Secure Ledger</h3>
                    <div className="edu-points">
                        <div className="edu-point">
                            <span className="point-icon">🔗</span>
                            <div>
                                <strong>Linked Blocks:</strong> Each block is connected to the previous one
                            </div>
                        </div>
                        <div className="edu-point">
                            <span className="point-icon">🛡️</span>
                            <div>
                                <strong>Tamper-Proof:</strong> Changing any block breaks the entire chain
                            </div>
                        </div>
                        <div className="edu-point">
                            <span className="point-icon">📝</span>
                            <div>
                                <strong>Permanent Record:</strong> Once added, records cannot be altered
                            </div>
                        </div>
                        <div className="edu-point">
                            <span className="point-icon">👁️</span>
                            <div>
                                <strong>Transparent:</strong> All changes are visible and detectable
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blockchain Visualization */}
            <div className="blockchain-section">
                <div className="section-header">
                    <h2>Blockchain Records</h2>
                    <div className="section-actions">
                        <div className="legend">
                            <div className="legend-item">
                                <div className="legend-color genesis"></div>
                                <span>Genesis Block</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color tax-record"></div>
                                <span>Tax Records</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-color tampered"></div>
                                <span>Tampered</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="blockchain-visualization">
                    {(blockchain && blockchain.length > 0)
                        ? blockchain.map((block, index) => {
                            const blockType = getBlockType(block);
                            const blockTitle = getBlockTitle(block);
                            const isTampered = isBlockTampered(block.index);
                            const connectionStatus = getConnectionStatus(block, blockchain[index + 1]);

                            return (
                                <React.Fragment key={block.hash}>
                                    <div className={`block-wrapper ${isTampered ? 'tampered' : ''}`}>
                                        <div className={`block-card block-${blockType} ${isTampered ? 'tampered-block' : ''}`}>
                                            {/* Block Header */}
                                            <div className="block-card-header">
                                                <div className="block-type-indicator">
                                                    <span className="block-icon">
                                                        {blockType === 'genesis' ? '🌱' :
                                                            blockType === 'tax-record' ? '📄' : '⚙️'}
                                                    </span>
                                                    <div className="block-titles">
                                                        <div className="block-main-title">{blockTitle}</div>
                                                        <div className="block-sub-title">Block #{block.index}</div>
                                                    </div>
                                                </div>
                                                <div className="block-actions">
                                                    {isTampered && (
                                                        <div className="tamper-warning">
                                                            ⚠️ COMPROMISED
                                                        </div>
                                                    )}
                                                    {blockType === 'tax-record' && (
                                                        <button
                                                            onClick={() => handleDeleteRecord(block)}
                                                            className="delete-block-btn"
                                                            title="Delete record (will break chain)"
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    )}
                                                    {block.index > 0 && !isTampered && (
                                                        <button
                                                            onClick={() => {
                                                                simulateTampering(block.index);
                                                                setTamperedBlocks(prev => new Set(prev).add(block.index));
                                                            }}
                                                            className="test-security-btn"
                                                        >
                                                            ⚠️ Test Security
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Block Content */}
                                            <div className="block-card-content">
                                                <div className="block-info-grid">
                                                    <div className="info-item">
                                                        <label>Timestamp</label>
                                                        <span>{block.timestamp}</span>
                                                    </div>

                                                    {block.data.type === 'tax_approval' && (
                                                        <>
                                                            <div className="info-item">
                                                                <label>Citizen Name</label>
                                                                <span className="highlight-text">{block.data.record.citizenName}</span>
                                                            </div>
                                                            <div className="info-item">
                                                                <label>Tax File</label>
                                                                <span>{block.data.record.fileName}</span>
                                                            </div>
                                                            <div className="info-item">
                                                                <label>Approval Status</label>
                                                                <span className="status-badge approved">Approved</span>
                                                            </div>
                                                            <div className="info-item">
                                                                <label>Approved By</label>
                                                                <span>{block.data.approvedBy || 'ZRA Officer'}</span>
                                                            </div>
                                                        </>
                                                    )}

                                                    {block.data.type === 'system' && (
                                                        <div className="info-item full-width">
                                                            <label>System Message</label>
                                                            <span>{block.data.message}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Hash Section */}
                                                <div className="hash-section">
                                                    <div className="hash-item">
                                                        <label>Previous Block Hash</label>
                                                        <div className="hash-value" title={block.previousHash}>
                                                            {block.previousHash.substring(0, 24)}...
                                                        </div>
                                                    </div>
                                                    <div className="hash-item">
                                                        <label>Current Block Hash</label>
                                                        <div className="hash-value" title={block.hash}>
                                                            {block.hash.substring(0, 24)}...
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Connection Line */}
                                    {index < blockchain.length - 1 && (
                                        <div className={`block-connection ${connectionStatus}`}>
                                            <div className="connection-line"></div>
                                            <div className="connection-status">
                                                {connectionStatus === 'broken' ? '❌ BROKEN' : '✅ CONNECTED'}
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })
                        : null}
                    const blockType = getBlockType(block);
                    const blockTitle = getBlockTitle(block);
                    const isTampered = isBlockTampered(block.index);
                    const connectionStatus = getConnectionStatus(block, blockchain[index + 1]);

                    return (
                    <React.Fragment key={block.hash}>
                        <div className={`block-wrapper ${isTampered ? 'tampered' : ''}`}>
                            <div className={`block-card block-${blockType} ${isTampered ? 'tampered-block' : ''}`}>
                                {/* Block Header */}
                                <div className="block-card-header">
                                    <div className="block-type-indicator">
                                        <span className="block-icon">
                                            {blockType === 'genesis' ? '🌱' :
                                                blockType === 'tax-record' ? '📄' : '⚙️'}
                                        </span>
                                        <div className="block-titles">
                                            <div className="block-main-title">{blockTitle}</div>
                                            <div className="block-sub-title">Block #{block.index}</div>
                                        </div>
                                    </div>
                                    <div className="block-actions">
                                        {isTampered && (
                                            <div className="tamper-warning">
                                                ⚠️ COMPROMISED
                                            </div>
                                        )}
                                        {blockType === 'tax-record' && (
                                            <button
                                                onClick={() => handleDeleteRecord(block)}
                                                className="delete-block-btn"
                                                title="Delete record (will break chain)"
                                            >
                                                🗑️ Delete
                                            </button>
                                        )}
                                        {block.index > 0 && !isTampered && (
                                            <button
                                                onClick={() => {
                                                    simulateTampering(block.index);
                                                    setTamperedBlocks(prev => new Set(prev).add(block.index));
                                                }}
                                                className="test-security-btn"
                                            >
                                                ⚠️ Test Security
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Block Content */}
                                <div className="block-card-content">
                                    <div className="block-info-grid">
                                        <div className="info-item">
                                            <label>Timestamp</label>
                                            <span>{block.timestamp}</span>
                                        </div>

                                        {block.data.type === 'tax_approval' && (
                                            <>
                                                <div className="info-item">
                                                    <label>Citizen Name</label>
                                                    <span className="highlight-text">{block.data.record.citizenName}</span>
                                                </div>
                                                <div className="info-item">
                                                    <label>Tax File</label>
                                                    <span>{block.data.record.fileName}</span>
                                                </div>
                                                <div className="info-item">
                                                    <label>Approval Status</label>
                                                    <span className="status-badge approved">Approved</span>
                                                </div>
                                                <div className="info-item">
                                                    <label>Approved By</label>
                                                    <span>{block.data.approvedBy || 'ZRA Officer'}</span>
                                                </div>
                                            </>
                                        )}

                                        {block.data.type === 'system' && (
                                            <div className="info-item full-width">
                                                <label>System Message</label>
                                                <span>{block.data.message}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Hash Section */}
                                    <div className="hash-section">
                                        <div className="hash-item">
                                            <label>Previous Block Hash</label>
                                            <div className="hash-value" title={block.previousHash}>
                                                {block.previousHash.substring(0, 24)}...
                                            </div>
                                        </div>
                                        <div className="hash-item">
                                            <label>Current Block Hash</label>
                                            <div className="hash-value" title={block.hash}>
                                                {block.hash.substring(0, 24)}...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Connection Line */}
                        {index < blockchain.length - 1 && (
                            <div className={`block-connection ${connectionStatus}`}>
                                <div className="connection-line"></div>
                                <div className="connection-status">
                                    {connectionStatus === 'broken' ? '❌ BROKEN' : '✅ CONNECTED'}
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                    );
                </div>

                {(blockchain && blockchain.length === 1) && (
                    <div className="empty-blockchain">
                        <div className="empty-icon">📋</div>
                        <h3>No Tax Approvals Recorded Yet</h3>
                        <p>Approved tax submissions will appear here as permanent, unchangeable records in the blockchain.</p>
                    </div>
                )}
            </div>

            {/* Security Notice */}
            {!isChainValid && (
                <div className="security-alert">
                    <div className="alert-icon">🚨</div>
                    <div className="alert-content">
                        <h4>Security Breach Detected!</h4>
                        <p>The blockchain integrity has been compromised. One or more blocks have been tampered with, breaking the chain's security.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlockchainPage;