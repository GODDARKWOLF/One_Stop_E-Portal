import React from 'react';
import { useBlockchain } from '../../../SharedContext/BlockchainContext';
import './CitizenBlockchainViewer.css';

const CitizenBlockchainViewer = () => {
    const { blockchain, isChainValid, validateChain, getTaxRecordsFromBlockchain } = useBlockchain();

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
            {/* Header Section */}
            <div className="citizen-bc-header">
                <div className="citizen-bc-title">
                    <h2>📒 My Tax Approval History</h2>
                    <p>Secure, permanent record of your tax submissions</p>
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

            {/* Quick Stats */}
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
                        {blockchain.length}
                    </div>
                    <div className="stat-label">Total Blocks</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">
                        {isChainValid ? '100%' : '!'}
                    </div>
                    <div className="stat-label">Integrity</div>
                </div>
            </div>

            {/* Educational Card */}
            <div className="citizen-edu-card">
                <div className="edu-icon">💡</div>
                <div className="edu-content">
                    <h4>Your Tax Records Are Secured by Blockchain</h4>
                    <div className="edu-points">
                        <div className="edu-point">✅ <strong>Permanent:</strong> Once approved, records cannot be changed</div>
                        <div className="edu-point">🔗 <strong>Linked:</strong> Each record connects to the previous one</div>
                        <div className="edu-point">🛡️ <strong>Secure:</strong> Any tampering is immediately detected</div>
                        <div className="edu-point">👁️ <strong>Transparent:</strong> You can verify your records anytime</div>
                    </div>
                </div>
            </div>

            {/* Records Timeline */}
            <div className="records-timeline">
                <h3>Your Approval Timeline</h3>

                {citizenRecords.length === 0 ? (
                    <div className="no-records">
                        <div className="no-records-icon">📋</div>
                        <h4>No Approved Tax Records Yet</h4>
                        <p>When your tax submissions are approved by ZRA, they will appear here as permanent records.</p>
                    </div>
                ) : (
                    <div className="timeline-container">
                        {citizenRecords.map((record, index) => (
                            <div key={record.transactionHash || record.id} className="timeline-item">
                                <div className="timeline-marker">
                                    <div className="marker-icon">
                                        {getStatusIcon(record.status)}
                                    </div>
                                    <div className="timeline-line"></div>
                                </div>

                                <div className="timeline-content">
                                    <div className="record-card">
                                        <div className="record-header">
                                            <div className="record-title">
                                                <h4>Tax File: {record.fileName}</h4>
                                                <span className="record-date">{record.timestamp}</span>
                                            </div>
                                            <div className="record-status approved">
                                                ✅ Approved
                                            </div>
                                        </div>

                                        <div className="record-details">
                                            <div className="detail-row">
                                                <span className="detail-label">Citizen Name:</span>
                                                <span className="detail-value">{record.citizenName}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">Approved By:</span>
                                                <span className="detail-value">{record.approvedBy || 'ZRA Officer'}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">Block Number:</span>
                                                <span className="detail-value">#{record.blockIndex}</span>
                                            </div>
                                            <div className="detail-row">
                                                <span className="detail-label">Transaction ID:</span>
                                                <span className="detail-value hash" title={record.transactionHash}>
                                                    {formatHash(record.transactionHash)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="security-badge">
                                            <span className="badge-icon">🔒</span>
                                            <span>Secured by ZRA Blockchain</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Verification Section */}
            <div className="verification-section">
                <div className="verification-card">
                    <h4>🔍 Verify Record Integrity</h4>
                    <p>Check that your tax records haven't been tampered with</p>
                    <button
                        onClick={validateChain}
                        className="verify-btn"
                    >
                        {isChainValid ? '✅ Verify All Records' : '⚠️ Check for Tampering'}
                    </button>

                    {!isChainValid && (
                        <div className="tamper-warning">
                            <span className="warning-icon">🚨</span>
                            <div>
                                <strong>Warning:</strong> Some records may have been tampered with.
                                Please contact ZRA for verification.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CitizenBlockchainViewer;