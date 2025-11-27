import React, { useState } from 'react';
import { useBlockchain } from '../../../SharedContext/BlockchainContext';
import './CitizenBlockchainViewer.css';

const CitizenBlockchainViewer = () => {
    const { zraChain, reportsChain, isChainValid, validateChain, getTaxRecordsFromBlockchain } = useBlockchain();
    const [activeTab, setActiveTab] = useState('zra'); // 'zra' or 'reports'

    // Get only tax approval records for this citizen
    const citizenRecords = getTaxRecordsFromBlockchain();

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved': return '✅';
            case 'Pending': return '⏳';
            case 'Failed': return '❌';
            default: return '📄';
        }
    };

    const formatHash = (hash) => {
        if (!hash) return 'N/A';
        return `${hash.substring(0, 12)}...${hash.substring(hash.length - 6)}`;
    };

    return (
        <div className="citizen-blockchain-viewer">
            {/* Tabs */}
            <div className="blockchain-tabs" style={{ marginBottom: '20px' }}>
                <button
                    className={`tab-button ${activeTab === 'zra' ? 'active' : ''}`}
                    onClick={() => setActiveTab('zra')}
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        border: 'none',
                        borderRadius: '4px',
                        background: activeTab === 'zra' ? '#007bff' : '#e9ecef',
                        color: activeTab === 'zra' ? 'white' : '#333',
                        cursor: 'pointer'
                    }}
                >
                    📑 ZRA Tax Records
                </button>
                <button
                    className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reports')}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        background: activeTab === 'reports' ? '#007bff' : '#e9ecef',
                        color: activeTab === 'reports' ? 'white' : '#333',
                        cursor: 'pointer'
                    }}
                >
                    🔍 Reports & Claims
                </button>
            </div>

            {/* Header Section */}
            <div className="citizen-bc-header">
                <div className="citizen-bc-title">
                    <h2>{activeTab === 'zra' ? '📒 My Tax Approval History' : '📋 My Reports History'}</h2>
                    <p>{activeTab === 'zra' ? 'Secure, permanent record of your tax submissions' : 'Blockchain record of your reports and claims'}</p>
                </div>
                <div className="citizen-bc-status">
                    <div className={`ledger-status ${isChainValid ? 'secure' : 'warning'}`}>
                        <span className="status-icon">
                            {isChainValid ? '🛡️' : '⚠️'}
                        </span>
                        <span className="status-text">
                            {isChainValid ? 'Records Secured' : 'Verify Records'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            {activeTab === 'zra' ? (
                /* ZRA Quick Stats */
                <div className="citizen-stats">
                    <div className="stat-item">
                        <div className="stat-value">{citizenRecords.length}</div>
                        <div className="stat-label">Total Approvals</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">
                            {citizenRecords.filter(record => record.status === 'Approved').length}
                        </div>
                        <div className="stat-label">Approved</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">
                            {isChainValid ? '100%' : '!'}
                        </div>
                        <div className="stat-label">Integrity</div>
                    </div>
                </div>
            ) : (
                /* Reports Quick Stats */
                <div className="citizen-stats">
                    <div className="stat-item">
                        <div className="stat-value">
                            {reportsChain.filter(block => block.event?.type === 'NEW_REPORT').length}
                        </div>
                        <div className="stat-label">Total Reports</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">
                            {reportsChain.filter(block =>
                                block.event?.type === 'NEW_REPORT' &&
                                block.event.payload.type === 'missing_person'
                            ).length}
                        </div>
                        <div className="stat-label">Missing Person Reports</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">
                            {reportsChain.filter(block =>
                                block.event?.type === 'verify'
                            ).length}
                        </div>
                        <div className="stat-label">Verified Reports</div>
                    </div>
                </div>
            )}

            {/* Educational Card */}
            <div className="educational-card">
                <div className="edu-icon">🔒</div>
                <div className="edu-content">
                    <h3>What is Blockchain?</h3>
                    <p>
                        {activeTab === 'zra'
                            ? 'A blockchain is a secure, tamper-proof digital ledger. Each tax approval becomes a "block" in the chain, creating a permanent and verifiable record of your transactions.'
                            : 'The reports blockchain securely records all your reports and their verification status. Police verifications are permanently recorded, ensuring transparency and trust.'
                        }
                    </p>
                </div>
            </div>

            {/* Records List */}
            <div className="blockchain-records">
                <h3>Recent Records</h3>
                {activeTab === 'zra' ? (
                    // ZRA Records
                    citizenRecords.length === 0 ? (
                        <div className="no-records">No tax approvals found in the blockchain.</div>
                    ) : (
                        <div className="records-list">
                            {citizenRecords.map((record, index) => (
                                <div key={index} className="record-item">
                                    <div className="record-header">
                                        <span className="record-icon">{getStatusIcon(record.status)}</span>
                                        <span className="record-type">{record.type || 'Tax Approval'}</span>
                                        <span className="record-date">{new Date(record.blockTimestamp).toLocaleString()}</span>
                                    </div>
                                    <div className="record-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Block:</span>
                                            <span className="detail-value">#{record.blockIndex}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Hash:</span>
                                            <span className="detail-value hash">{formatHash(record.transactionHash)}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Amount:</span>
                                            <span className="detail-value">K{record.amount?.toFixed(2) || '0.00'}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Officer:</span>
                                            <span className="detail-value">{record.approvedBy || 'System'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    // Reports Records
                    reportsChain.length === 0 ? (
                        <div className="no-records">No reports found in the blockchain.</div>
                    ) : (
                        <div className="records-list">
                            {reportsChain.filter(block => block.event).map((block, index) => (
                                <div key={index} className="record-item">
                                    <div className="record-header">
                                        <span className="record-icon">
                                            {block.event.type === 'NEW_REPORT'
                                                ? (block.event.payload.type === 'missing_person' ? '🚨' : '📝')
                                                : block.event.type === 'verify' ? '✅' : '📋'}
                                        </span>
                                        <span className="record-type">
                                            {block.event.type === 'NEW_REPORT'
                                                ? (block.event.payload.type === 'missing_person'
                                                    ? `Missing Person: ${block.event.payload.missingName}`
                                                    : block.event.payload.title || 'General Report')
                                                : `Report ${block.event.type.charAt(0).toUpperCase() + block.event.type.slice(1)}`}
                                        </span>
                                        <span className="record-date">{new Date(block.timestamp).toLocaleString()}</span>
                                    </div>
                                    <div className="record-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Block:</span>
                                            <span className="detail-value">#{block.index}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Hash:</span>
                                            <span className="detail-value hash">{formatHash(block.hash)}</span>
                                        </div>
                                        {block.event.type === 'verify' && (
                                            <div className="detail-item">
                                                <span className="detail-label">Verified By:</span>
                                                <span className="detail-value">{block.event.officer || 'Unknown Officer'}</span>
                                            </div>
                                        )}
                                        {block.event.type === 'NEW_REPORT' && (
                                            <div className="detail-item">
                                                <span className="detail-label">Description:</span>
                                                <span className="detail-value">
                                                    {block.event.payload.description?.substring(0, 100)}
                                                    {block.event.payload.description?.length > 100 ? '...' : ''}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default CitizenBlockchainViewer;