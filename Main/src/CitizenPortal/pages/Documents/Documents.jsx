import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUpload,
    faFile,
    faFileAlt,
    faFilePdf,
    faFileImage,
    faCheckCircle,
    faSpinner,
    faDownload,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import './Documents.css';

const Documents = () => {
    const [dragActive, setDragActive] = useState(false);

    // Mock data - replace with real data from backend
    const documents = [
        {
            id: 1,
            name: "National Registration Card",
            type: "pdf",
            size: "1.2 MB",
            uploadDate: "2025-10-20",
            status: "verified",
            category: "Identity"
        },
        {
            id: 2,
            name: "Marriage Certificate",
            type: "pdf",
            size: "2.1 MB",
            uploadDate: "2025-10-15",
            status: "pending",
            category: "Civil Status"
        },
        {
            id: 3,
            name: "Business Registration",
            type: "pdf",
            size: "3.4 MB",
            uploadDate: "2025-10-10",
            status: "verified",
            category: "Business"
        },
        {
            id: 4,
            name: "Property Deed",
            type: "pdf",
            size: "4.8 MB",
            uploadDate: "2025-10-05",
            status: "rejected",
            category: "Property"
        }
    ];

    const categories = [
        { id: 'all', name: 'All Documents' },
        { id: 'identity', name: 'Identity Documents' },
        { id: 'civil', name: 'Civil Status' },
        { id: 'business', name: 'Business Documents' },
        { id: 'property', name: 'Property Documents' },
        { id: 'tax', name: 'Tax Documents' }
    ];

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Handle file upload
            console.log("File dropped:", e.dataTransfer.files);
        }
    };

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf':
                return faFilePdf;
            case 'image':
                return faFileImage;
            default:
                return faFileAlt;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified':
                return <FontAwesomeIcon icon={faCheckCircle} className="status-icon success" />;
            case 'pending':
                return <FontAwesomeIcon icon={faSpinner} className="status-icon warning spin" />;
            case 'rejected':
                return <FontAwesomeIcon icon={faTrash} className="status-icon danger" />;
            default:
                return null;
        }
    };

    return (
        <div className="documents-container">
            <div className="documents-header">
                <div>
                    <h1>Documents & Data</h1>
                    <p className="text-secondary">Manage your official documents and personal data</p>
                </div>
                <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faUpload} />
                    Upload New Document
                </button>
            </div>

            <div className="documents-grid">
                <div className="documents-sidebar card">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        {categories.map(category => (
                            <li key={category.id} className="category-item">
                                <FontAwesomeIcon icon={faFile} />
                                {category.name}
                            </li>
                        ))}
                    </ul>

                    <div
                        className={`upload-zone card ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                        <p>Drag and drop files here</p>
                        <span>or</span>
                        <button className="btn btn-secondary">Browse Files</button>
                    </div>
                </div>

                <div className="documents-content">
                    <div className="documents-filters">
                        <input
                            type="search"
                            placeholder="Search documents..."
                            className="search-input"
                        />
                        <select className="filter-select">
                            <option value="all">All Status</option>
                            <option value="verified">Verified</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="documents-list">
                        {documents.map(doc => (
                            <div key={doc.id} className="document-card card slide-in-up">
                                <div className="document-icon">
                                    <FontAwesomeIcon icon={getFileIcon(doc.type)} />
                                </div>
                                <div className="document-info">
                                    <h4>{doc.name}</h4>
                                    <span className="document-meta">
                                        {doc.size} • {doc.uploadDate}
                                    </span>
                                    <span className="document-category">{doc.category}</span>
                                </div>
                                <div className="document-status">
                                    {getStatusIcon(doc.status)}
                                    <span className={`status-text ${doc.status}`}>
                                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                    </span>
                                </div>
                                <div className="document-actions">
                                    <button className="btn btn-icon" title="Download">
                                        <FontAwesomeIcon icon={faDownload} />
                                    </button>
                                    <button className="btn btn-icon" title="Delete">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;