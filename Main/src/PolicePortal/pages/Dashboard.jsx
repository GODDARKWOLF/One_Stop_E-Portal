import React, { useEffect, useState, useMemo } from 'react'
import './policeDashboard.css'
import { useReports } from "../../SharedContext/ReportsContext";
import { useBlockchain } from "../../SharedContext/BlockchainContext";

export default function PoliceDashboard() {
  const { reports, verifyReport, assignOfficer, updateStatus } = useReports();
  // defend against undefined chain (context may initialize async)
  const _bc = useBlockchain() || {};
  const { chain = [] } = _bc;
  const [filter, setFilter] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [incidentAlerts, setIncidentAlerts] = useState([]);

  useEffect(() => {
    // Filter for NEW_REPORT events and sort by timestamp
    const newReports = (chain || [])
      .filter(block => block.event && block.event.type === "NEW_REPORT")
      .map(block => ({ ...block.event.payload, blockTimestamp: block.timestamp }))
      .sort((a, b) => new Date(b.blockTimestamp) - new Date(a.blockTimestamp));
    setIncidentAlerts(newReports);
  }, [chain]);

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const sorted = [...reports].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (!q) return sorted;
    return sorted.filter(r =>
      (r.missingName || "").toLowerCase().includes(q) ||
      (r.reporterName || "").toLowerCase().includes(q) ||
      (r.reporterContact || "").toLowerCase().includes(q) ||
      (r.type || "").toLowerCase().includes(q) ||
      (r.id || "").toLowerCase().includes(q)
    );
  }, [reports, filter]);

  function handleVerify(id) {
    const officer = officerName || "Officer (demo)";
    verifyReport(id, officer);

    // Add verification to blockchain
    const report = reports.find(r => r.id === id);
    if (report) {
      _bc.addBlock({
        type: 'verify',
        reportId: id,
        officer: officer,
        reportType: report.type,
        verifiedAt: new Date().toISOString()
      });
    }
  }

  function handleAssign(id) {
    const name = prompt("Enter officer name to assign:", officerName || "");
    if (name) {
      assignOfficer(id, name);

      // Add assignment to blockchain
      const report = reports.find(r => r.id === id);
      if (report) {
        _bc.addBlock({
          type: 'assign_officer',
          reportId: id,
          officer: name,
          reportType: report.type,
          assignedAt: new Date().toISOString()
        });
      }
    }
  }

  function handleStatus(id) {
    const status = prompt("Set status (Pending / Verified / Closed):", "Closed");
    if (status) {
      updateStatus(id, status);

      // Add status change to blockchain
      const report = reports.find(r => r.id === id);
      if (report) {
        _bc.addBlock({
          type: 'status_change',
          reportId: id,
          oldStatus: report.status,
          newStatus: status,
          officer: officerName || "Officer (demo)",
          updatedAt: new Date().toISOString()
        });
      }
    }
  }

  function getStatusClass(status) {
    switch (status?.toLowerCase()) {
      case 'verified': return 'status-verified';
      case 'closed': return 'status-closed';
      default: return 'status-pending';
    }
  }

  return (
    <div className="police-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Police Dashboard — Live Alerts</h2>
      </div>

      <div className="dashboard-controls">
        <input
          className="search-input"
          placeholder="Filter (name, reporter, id, type)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <input
          className="officer-input"
          placeholder="Your officer name (optional)"
          value={officerName}
          onChange={(e) => setOfficerName(e.target.value)}
        />
      </div>

      <div className="dashboard-layout">
        <div className="reports-container">
          {visible.length === 0 && <div className="empty-state">No alerts yet.</div>}
          {visible.map(r => {
            const isMissing = r.type === "missing_person";
            return (
              <div key={r.id} className={`report-card ${isMissing ? 'missing-person' : ''}`}>
                <div className="report-header">
                  <div>
                    <h3 className="report-title">
                      {isMissing ? `MISSING: ${r.missingName || "(no name)"}` : (r.type || "Report")}
                    </h3>
                    <div className="report-timestamp">{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="report-meta">
                    <span className={`report-status ${getStatusClass(r.status)}`}>
                      {r.status} {r.verified ? "✅" : ""}
                    </span>
                    <div className="officer-assigned">{r.assignedOfficer || "Unassigned"}</div>
                  </div>
                </div>

                <div className="report-details">
                  <div className="reporter-info">
                    <strong>Reporter:</strong> {r.reporterName} • {r.reporterContact} ({r.relation})
                  </div>
                  {isMissing && (
                    <div className="last-seen-info">
                      <strong>Last seen:</strong> {r.lastSeenLocation} on {r.lastSeenDate}
                    </div>
                  )}
                  <p className="report-description">{r.description || "—"}</p>
                </div>

                <div className="report-actions">
                  <button className="action-btn verify-btn" onClick={() => handleVerify(r.id)}>
                    Verify
                  </button>
                  <button className="action-btn assign-btn" onClick={() => handleAssign(r.id)}>
                    Assign
                  </button>
                  <button className="action-btn status-btn" onClick={() => handleStatus(r.id)}>
                    Change status
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="blockchain-sidebar">
          <h4 className="sidebar-title">Chain Feed (latest events)</h4>
          <div className="chain-feed">
            {(!chain || chain.length === 0) && (
              <div className="empty-state">No chain events yet.</div>
            )}
            {chain.slice().reverse().map((b, idx) => (
              <div key={idx} className="chain-item">
                <div className="chain-timestamp">{b.timestamp}</div>
                <div className="chain-event">
                  {b.reportId ? (
                    <strong>Report added: {b.reportId}</strong>
                  ) : b.event ? (
                    <strong>Event: {b.event.type}</strong>
                  ) : (
                    <strong>Block #{b.index}</strong>
                  )}
                </div>
                <div className="chain-payload">
                  {b.payload ? JSON.stringify(b.payload) : (b.event ? JSON.stringify(b.event) : "")}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="incident-alerts">
        <h3 className="incident-title">Incident Alerts (Live from Blockchain)</h3>
        <div className="alerts-container">
          {incidentAlerts.length === 0 && <div className="empty-state">No new incident alerts.</div>}
          {incidentAlerts.map(alert => (
            <div
              key={alert.id}
              className={`alert-item ${alert.type === 'missing_person' ? 'alert-missing' : 'alert-other'}`}
            >
              <div className="alert-header">
                {alert.type === 'missing_person'
                  ? `MISSING PERSON: ${alert.missingName}`
                  : `REPORT: ${alert.title || alert.type}`
                }
              </div>
              <div className="alert-meta">
                Reporter: {alert.reporterName} • {new Date(alert.blockTimestamp).toLocaleString()}
              </div>
              {alert.description && (
                <p className="alert-description">
                  {alert.description.substring(0, 70)}...
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}