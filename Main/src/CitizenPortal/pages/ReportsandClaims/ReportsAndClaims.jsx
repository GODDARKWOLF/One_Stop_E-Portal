import React, { useEffect, useState } from "react";
import { useReports } from "../../../SharedContext/ReportsContext";
import relativesSeed from "../../../data/relatives.json";
import { useNavigate } from "react-router-dom";
import CitizenReportForm from "../../components/Dashboard/Citizenreportform";
import Modal from "../../../components/Dashboard/Modal";
import MissingRelativeForm from "../../../components/Dashboard/MissingRelativeForm";
import GeneralReportForm from "../../../components/Dashboard/GeneralReportForm";
import "./ReportsAndClaims.css";

export default function ReportsAndClaims() {
    const { reports, addReport } = useReports();
    const [recent, setRecent] = useState([]);
    const [relatives, setRelatives] = useState(relativesSeed || []);
    const [isMissingRelativeModalOpen, setIsMissingRelativeModalOpen] = useState(false);
    const [selectedRelative, setSelectedRelative] = useState(null);
    const [isGeneralReportModalOpen, setIsGeneralReportModalOpen] = useState(false);
    const navigate = useNavigate();
    const [toast, setToast] = useState({ visible: false, message: '' });

    useEffect(() => {
        const sorted = [...reports].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);
        setRecent(sorted);
    }, [reports]);

    function getNearestStation() {
        return "Central Police Station";
    }

    function handleReportRelative(relative) {
        setSelectedRelative(relative);
        setIsMissingRelativeModalOpen(true);
    }

    function handleConfirmMissingRelative(formData) {
        if (!selectedRelative) return;
        const payload = {
            type: "missing_person",
            reporterName: "Current Citizen (demo)",
            reporterContact: "+26097XXXXXXX",
            relation: selectedRelative.relation,
            missingName: selectedRelative.name,
            missingAge: selectedRelative.age,
            missingGender: selectedRelative.gender,
            lastSeenLocation: formData.lastSeenLocation,
            lastSeenDate: formData.lastSeenDate,
            description: formData.description,
            photoURL: selectedRelative.photoURL || ""
        };
        const created = addReport(payload);
        setRelatives(prev =>
            prev.map(rel =>
                rel.id === selectedRelative.id ? { ...rel, status: "Missing" } : rel
            )
        );
        setToast({ visible: true, message: `Report submitted (ID: ${created.id}) — nearest station: ${getNearestStation()}` });
        setTimeout(() => setToast({ visible: false, message: '' }), 3500);
        setIsMissingRelativeModalOpen(false);
        setSelectedRelative(null);
    }

    function handleFileNewReport() {
        setIsGeneralReportModalOpen(true);
    }

    function handleGeneralReportSubmit(formData) {
        const payload = {
            type: "general_report",
            reporterName: "Current Citizen (demo)",
            reporterContact: "+26097XXXXXXX",
            title: formData.title,
            description: formData.description,
            location: formData.location,
            incidentDate: formData.incidentDate,
        };
        const created = addReport(payload);
        setToast({ visible: true, message: `General report submitted (ID: ${created.id}) — nearest station: ${getNearestStation()}` });
        setTimeout(() => setToast({ visible: false, message: '' }), 3500);
        setIsGeneralReportModalOpen(false);
    }

    return (
        <div className="reports-page">
            <h2 className="page-title">Reports & Claims</h2>

            <section className="section">
                <div className="section-header">
                    <h3>Recent Reports</h3>
                    <button className="primary-btn" onClick={handleFileNewReport}>
                        + File New Report
                    </button>
                </div>

                <div className="reports-list">
                    {recent.length === 0 && <p className="no-reports">No recent reports. File one to notify police.</p>}
                    {recent.map(r => (
                        <div key={r.id} className="report-card">
                            <div className="report-details">
                                <div className="report-header">
                                    <strong>{r.type === "missing_person" ? `Missing: ${r.missingName || "(name)"}` : r.type}</strong>
                                    <small>{new Date(r.createdAt).toLocaleString()}</small>
                                </div>
                                <p className="report-meta">
                                    Reporter: {r.reporterName} • {r.reporterContact}
                                </p>
                                <p className="report-desc">{r.description || "—"}</p>
                            </div>
                            <div className="report-actions">
                                <div className="status">
                                    <strong>Status:</strong> {r.status} {r.verified ? "✅" : ""}
                                </div>
                                <button className="view-btn" onClick={() => navigate(`/citizen/reportsandclaims`)}>View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                <h3>Report Missing Relative</h3>
                <p className="section-sub">
                    Select a relative below and click <em>Report Missing</em>. This will auto-fill the report and notify the nearest station.
                </p>

                <div className="relatives-grid">
                    {relatives.map(rel => (
                        <div key={rel.id} className="relative-card">
                            <div className="relative-photo">
                                {/* Render provided photoURL or fall back to a default image */}
                                <img
                                    src={rel.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3m972e8FEvBi7ETC03avlJcZDg8nT9dWLSw&s'}
                                    alt={rel.name}
                                />
                            </div>
                            <div className="relative-info">
                                <strong>{rel.name}</strong>
                                <p className="relative-meta">{rel.relation} • {rel.age}yrs • {rel.gender}</p>
                                <p className="relative-last">Last known: {rel.lastKnownLocation}</p>
                                <p className="relative-notes">{rel.notes}</p>
                            </div>
                            <button
                                className={`report-btn ${rel.status === "Missing" ? "missing" : ""}`}
                                onClick={() => handleReportRelative(rel)}
                            >
                                {rel.status === "Missing" ? "⚠ Missing" : "Report Missing"}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {isMissingRelativeModalOpen && selectedRelative && (
                <Modal title={`Report Missing: ${selectedRelative.name}`} onClose={() => setIsMissingRelativeModalOpen(false)}>
                    <MissingRelativeForm
                        relative={selectedRelative}
                        onSubmit={handleConfirmMissingRelative}
                        onCancel={() => setIsMissingRelativeModalOpen(false)}
                    />
                </Modal>
            )}

            {isGeneralReportModalOpen && (
                <Modal title="File a New Report" onClose={() => setIsGeneralReportModalOpen(false)}>
                    <CitizenReportForm onSubmit={handleGeneralReportSubmit} onCancel={() => setIsGeneralReportModalOpen(false)} />
                </Modal>
            )}

            {toast.visible && <div className="toast">{toast.message}</div>}
        </div>
    );
}
