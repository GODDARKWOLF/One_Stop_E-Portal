// src/GovPortal/GovDashboard/pages/TaxRecords.jsx
import React, { useContext } from "react";
import { TaxContext } from "../../../SharedContext/TaxContext";
import { useBlockchain } from "../../../SharedContext/BlockchainContext";
import "./TaxRecords.css";

const TaxRecords = () => {
  const { taxRecords, updateTaxStatus, deleteTaxRecord } = useContext(TaxContext);
  const { addToBlockchain } = useBlockchain();

  // Helper: safely extract and render value
  const displayValue = (value) => {
    if (value === null || value === undefined) return "—";
    if (typeof value !== "object") return value;

    if (value.record && typeof value.record === "object") {
      return displayValue(value.record);
    }

    if (value.citizenName) return value.citizenName;
    if (value.fileName) return value.fileName;
    if (value.timestamp) return value.timestamp;
    if (value.status) return value.status;
    if (value.id) return value.id;

    console.warn("Unexpected object structure:", value);
    return "Invalid Data";
  };

  // Helper: get the actual record data (handles nested object issues)
  const getActualRecord = (record) => {
    if (typeof record !== "object") {
      try {
        return JSON.parse(record);
      } catch {
        return record;
      }
    }
    if (record.record && typeof record.record === "object") {
      return record.record;
    }
    return record;
  };

  // ✅ Approve a record
  const handleApprove = (record) => {
    const actualRecord = getActualRecord(record);
    updateTaxStatus(actualRecord.id, "Success");

    addToBlockchain({
      id: actualRecord.id,
      citizenName: displayValue(actualRecord.citizenName),
      fileName: displayValue(actualRecord.fileName),
      timestamp: displayValue(actualRecord.timestamp),
      status: "Approved",
      approvedAt: new Date().toLocaleString(),
    });
  };

  // ❌ Reject a record
  const handleReject = (record) => {
    const actualRecord = getActualRecord(record);
    updateTaxStatus(actualRecord.id, "Failed");
  };

  // 🗑 Delete a record + simulate blockchain tampering
  const handleDelete = (record) => {
    const actualRecord = getActualRecord(record);
    const confirmed = window.confirm(
      `Are you sure you want to delete the tax record for ${displayValue(
        actualRecord.citizenName
      )}? This will simulate blockchain tampering.`
    );

    if (!confirmed) return;

    // Delete from TaxContext (removes from localStorage)
    deleteTaxRecord(actualRecord.id);

    // Add tamper alert to blockchain ledger
    addToBlockchain({
      id: actualRecord.id,
      citizenName: displayValue(actualRecord.citizenName),
      fileName: displayValue(actualRecord.fileName),
      timestamp: new Date().toLocaleString(),
      status: "⚠️ Record Deleted - Blockchain Tampered",
    });

    alert("⚠️ Blockchain integrity compromised! Tampering detected.");
  };

  return (
    <div className="gov-tax-page">
      <h2>Citizen Tax Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Citizen Name</th>
            <th>File</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!taxRecords || taxRecords.length === 0 ? (
            <tr>
              <td colSpan="5">No submissions yet.</td>
            </tr>
          ) : (
            taxRecords.map((record) => {
              const actualRecord = getActualRecord(record);

              return (
                <tr key={actualRecord.id}>
                  <td>{displayValue(actualRecord.citizenName)}</td>
                  <td>{displayValue(actualRecord.fileName)}</td>
                  <td>{displayValue(actualRecord.timestamp)}</td>
                  <td
                    className={`status ${(actualRecord.status || "pending").toLowerCase()
                      }`}
                  >
                    {displayValue(actualRecord.status) || "Pending"}
                  </td>
                  <td>
                    <div className="action-buttons">
                      {actualRecord.status === "Pending" ? (
                        <>
                          <button
                            className="approve"
                            onClick={() => handleApprove(actualRecord)}
                          >
                            Approve
                          </button>
                          <button
                            className="reject"
                            onClick={() => handleReject(actualRecord)}
                          >
                            Reject
                          </button>
                          <button
                            className="delete"
                            onClick={() => handleDelete(actualRecord)}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <span style={{ color: "#888", marginRight: "10px" }}>
                            —
                          </span>
                          <button
                            className="delete"
                            onClick={() => handleDelete(actualRecord)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaxRecords;
