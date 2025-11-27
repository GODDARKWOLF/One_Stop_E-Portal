import React, { useState, useEffect } from "react";
import { useReports } from "../../../SharedContext/ReportsContext";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function CitizenReportForm({ defaultType = "police_report", onSubmit: parentOnSubmit, onCancel }) {
    const { addReport } = useReports();
    const navigate = useNavigate();

    // Station list with codes used for reference number generation
    const stations = [
        { name: "Central Police Station", code: "CPS" },
        { name: "Lusaka North", code: "LN" },
        { name: "Lusaka West", code: "LW" },
        { name: "Kabwe", code: "KB" },
        { name: "Ndola", code: "ND" },
        { name: "Livingstone", code: "LV" }
    ];

    const [type, setType] = useState(defaultType);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    // Applicant Personal Details
    const [applicant, setApplicant] = useState({
        fullName: "",
        nrcNumber: "",
        dob: "",
        gender: "",
        address: "",
        phone: "",
        reason: "employment"
    });

    // Report Details
    const [reportDetails, setReportDetails] = useState({
        stationName: stations[0].name,
        stationCode: stations[0].code,
        referenceNumber: "",
        dateIssued: new Date().toISOString().slice(0, 10),
        identityVerificationMethod: "NRC",
        backgroundChecks: {
            localStationRecords: false,
            nationalCriminalRecords: false,
            arrestWarrantDatabase: false,
            pendingCaseDatabase: false
        }
    });

    // Findings
    const [findings, setFindings] = useState({
        criminalRecordStatus: "no_record",
        caseNumber: "",
        offenseType: "",
        caseStatus: "closed",
        additionalNotes: ""
    });

    useEffect(() => {
        // Generate a default reference number on mount or when station changes
        const generateRef = (code) => {
            const year = new Date().getFullYear();
            const rand = Math.floor(1000 + Math.random() * 9000);
            return `ZPS/${code}/${year}/PR/${rand}`;
        };

        setReportDetails(prev => ({ ...prev, referenceNumber: generateRef(prev.stationCode) }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // When station changes, regenerate reference number
        setReportDetails(prev => ({ ...prev, referenceNumber: `ZPS/${prev.stationCode}/${new Date().getFullYear()}/PR/${Math.floor(1000 + Math.random() * 9000)}` }));
    }, [reportDetails.stationCode]);

    function handleApplicantChange(e) {
        const { name, value } = e.target;
        setApplicant(prev => ({ ...prev, [name]: value }));
    }

    function handleReportDetailChange(e) {
        const { name, value, type: inputType, checked } = e.target;
        if (name.startsWith('background_')) {
            const key = name.replace('background_', '');
            setReportDetails(prev => ({
                ...prev,
                backgroundChecks: {
                    ...prev.backgroundChecks,
                    [key]: checked
                }
            }));
            return;
        }

        if (name === 'stationCode') {
            const station = stations.find(s => s.code === value);
            setReportDetails(prev => ({ ...prev, stationCode: value, stationName: station ? station.name : prev.stationName }));
            return;
        }

        setReportDetails(prev => ({ ...prev, [name]: value }));
    }

    function handleFindingsChange(e) {
        const { name, value } = e.target;
        setFindings(prev => ({ ...prev, [name]: value }));
    }

    function validateForm() {
        if (!applicant.fullName || !applicant.nrcNumber || !applicant.phone) {
            setMessage('Full name, NRC Number and phone are required.');
            return false;
        }

        if (findings.criminalRecordStatus === 'has_record') {
            if (!findings.caseNumber || !findings.offenseType) {
                setMessage('Please provide case number and type of offense for records that exist.');
                return false;
            }
        }

        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        if (!validateForm()) {
            setSubmitting(false);
            return;
        }

        try {
            const payload = {
                type: 'police_report',
                applicant,
                reportDetails,
                findings,
                createdAt: new Date().toISOString()
            };

            const created = addReport(payload);
            setMessage(`Police report created (Ref: ${reportDetails.referenceNumber}).`);

            // Reset to defaults after submit
            setApplicant({ fullName: "", nrcNumber: "", dob: "", gender: "", address: "", phone: "", reason: "employment" });
            setFindings({ criminalRecordStatus: "no_record", caseNumber: "", offenseType: "", caseStatus: "closed", additionalNotes: "" });
            setReportDetails(prev => ({ ...prev, referenceNumber: `ZPS/${prev.stationCode}/${new Date().getFullYear()}/PR/${Math.floor(1000 + Math.random() * 9000)}` }));

            if (typeof parentOnSubmit === 'function') {
                parentOnSubmit(created);
            } else {
                setTimeout(() => navigate('/citizen/reportsandclaims'), 800);
            }
        } catch (err) {
            console.error(err);
            setMessage('Failed to create police report.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="report-form-container police-report-form">
            <h2 className="form-title">Police Clearance Report (ZPS)</h2>

            <form className="report-form" onSubmit={handleSubmit}>
                <h3>1. Applicant Personal Details</h3>
                <label className="form-label">
                    Full Name
                    <input name="fullName" value={applicant.fullName} onChange={handleApplicantChange} className="form-input" placeholder="Given names and surname" />
                </label>

                <label className="form-label">
                    NRC Number
                    <input name="nrcNumber" value={applicant.nrcNumber} onChange={handleApplicantChange} className="form-input" placeholder="NRC/Passport number" />
                </label>

                <div className="two-columns">
                    <label className="form-label">
                        Date of Birth
                        <input type="date" name="dob" value={applicant.dob} onChange={handleApplicantChange} className="form-input" />
                    </label>

                    <label className="form-label">
                        Gender
                        <select name="gender" value={applicant.gender} onChange={handleApplicantChange} className="form-select">
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>

                <label className="form-label">
                    Residential Address
                    <input name="address" value={applicant.address} onChange={handleApplicantChange} className="form-input" placeholder="Street, area, city" />
                </label>

                <label className="form-label">
                    Phone Number
                    <input name="phone" value={applicant.phone} onChange={handleApplicantChange} className="form-input" placeholder="e.g. +26097XXXXXXX" />
                </label>

                <label className="form-label">
                    Reason for Report
                    <select name="reason" value={applicant.reason} onChange={handleApplicantChange} className="form-select">
                        <option value="employment">Employment</option>
                        <option value="school">School</option>
                        <option value="immigration">Immigration</option>
                        <option value="general_clearance">General Clearance</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                <hr />

                <h3>2. Report Details</h3>
                <label className="form-label">
                    Station Name
                    <select name="stationCode" value={reportDetails.stationCode} onChange={handleReportDetailChange} className="form-select">
                        {stations.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                    </select>
                </label>

                <div className="two-columns">
                    <label className="form-label">
                        Reference Number
                        <input name="referenceNumber" value={reportDetails.referenceNumber} onChange={handleReportDetailChange} className="form-input" readOnly />
                    </label>

                    <label className="form-label">
                        Date Issued
                        <input name="dateIssued" value={reportDetails.dateIssued} onChange={handleReportDetailChange} className="form-input" type="date" />
                    </label>
                </div>

                <label className="form-label">
                    Identity Verification Method
                    <select name="identityVerificationMethod" value={reportDetails.identityVerificationMethod} onChange={handleReportDetailChange} className="form-select">
                        <option value="NRC">NRC</option>
                        <option value="Passport">Passport</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

                <div className="form-label">
                    <strong>Background Checks Performed</strong>
                    <div className="checkbox-list">
                        <label><input type="checkbox" name="background_localStationRecords" checked={reportDetails.backgroundChecks.localStationRecords} onChange={handleReportDetailChange} /> Local Station Records</label>
                        <label><input type="checkbox" name="background_nationalCriminalRecords" checked={reportDetails.backgroundChecks.nationalCriminalRecords} onChange={handleReportDetailChange} /> National Criminal Records Registry</label>
                        <label><input type="checkbox" name="background_arrestWarrantDatabase" checked={reportDetails.backgroundChecks.arrestWarrantDatabase} onChange={handleReportDetailChange} /> Arrest/Warrant Database</label>
                        <label><input type="checkbox" name="background_pendingCaseDatabase" checked={reportDetails.backgroundChecks.pendingCaseDatabase} onChange={handleReportDetailChange} /> Pending Case Database</label>
                    </div>
                </div>

                <hr />

                <h3>3. Findings</h3>
                <label className="form-label">
                    Criminal Record Status
                    <select name="criminalRecordStatus" value={findings.criminalRecordStatus} onChange={handleFindingsChange} className="form-select">
                        <option value="no_record">No criminal record</option>
                        <option value="has_record">Has criminal record</option>
                    </select>
                </label>

                {findings.criminalRecordStatus === 'has_record' && (
                    <>
                        <label className="form-label">
                            Case Number
                            <input name="caseNumber" value={findings.caseNumber} onChange={handleFindingsChange} className="form-input" placeholder="ZPS/CASE/2025/..." />
                        </label>

                        <label className="form-label">
                            Type of Offense
                            <input name="offenseType" value={findings.offenseType} onChange={handleFindingsChange} className="form-input" placeholder="e.g. theft, assault" />
                        </label>

                        <label className="form-label">
                            Case Status
                            <select name="caseStatus" value={findings.caseStatus} onChange={handleFindingsChange} className="form-select">
                                <option value="closed">Closed</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending Court</option>
                            </select>
                        </label>
                    </>
                )}

                <label className="form-label">
                    Additional Notes
                    <textarea name="additionalNotes" value={findings.additionalNotes} onChange={handleFindingsChange} className="form-textarea" placeholder="Any extra findings or comments" />
                </label>

                <div className="form-actions">
                    <button className="submit-btn" type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Generate Police Report'}</button>
                    {onCancel && <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>}
                </div>

                {message && <p className="form-message">{message}</p>}
            </form>
        </div>
    );
}
