import React, { useState, useContext } from "react";
import { TaxContext } from "../../../SharedContext/TaxContext";
import { useBlockchain } from "../../../SharedContext/BlockchainContext";
import "./Tax.css";

const Tax = () => {
    const { taxRecords, addTaxRecord } = useContext(TaxContext);
    const { blockchain, getTaxRecordsFromBlockchain } = useBlockchain();

    const [selectedFile, setSelectedFile] = useState(null);
    const [citizenName, setCitizenName] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!citizenName || !selectedFile) {
            alert("Please enter your name and select a file before submitting.");
            return;
        }

        const newRecord = {
            citizenName,
            fileName: selectedFile.name
        };

        addTaxRecord(newRecord);
        setCitizenName("");
        setSelectedFile(null);
        e.target.reset(); // Reset the form
    };

    const getBlockchainEntry = (recordId) => {
        // Safely check if blockchain exists and has data
        if (!blockchain || !Array.isArray(blockchain)) {
            return null;
        }

        // Find the block that contains this record ID
        return blockchain.find((block) =>
            block.data &&
            block.data.record &&
            block.data.record.id === recordId
        );
    };

    // Get approved records from blockchain for display
    const approvedRecords = getTaxRecordsFromBlockchain ? getTaxRecordsFromBlockchain() : [];

    return (
        <div className="citizen-tax-page">
            <h2>My Tax Submissions</h2>

            <form className="upload-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    required
                />
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload Tax File</button>
            </form>

            <div className="tax-records">
                {taxRecords.length === 0 ? (
                    <p>No tax records found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>File</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Blockchain Record</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taxRecords.map((record) => {
                                const blockchainEntry = getBlockchainEntry(record.id);
                                return (
                                    <tr key={record.id}>
                                        <td>{record.fileName}</td>
                                        <td>{record.timestamp}</td>
                                        <td className={`status ${record.status.toLowerCase()}`}>
                                            {record.status}
                                        </td>
                                        <td>
                                            {record.status === "Success" && blockchainEntry ? (
                                                <div className="blockchain-entry">
                                                    ✅ Approved in Block #{blockchainEntry.index}
                                                    <br />
                                                    <small className="hash">
                                                        Hash: {blockchainEntry.hash?.substring(0, 16)}...
                                                    </small>
                                                </div>
                                            ) : record.status === "Success" ? (
                                                <div className="blockchain-entry">
                                                    ✅ Approved (Processing...)
                                                </div>
                                            ) : (
                                                <span style={{ color: "#999" }}>—</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Optional: Show blockchain status */}
            <div className="blockchain-status">
                <h3>Blockchain Status</h3>
                <p>Total Blocks: {blockchain?.length || 0}</p>
                <p>Approved Tax Records: {approvedRecords.length}</p>
            </div>
        </div>
    );
};

export default Tax;