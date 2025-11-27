import React, { createContext, useContext, useEffect, useState } from "react";
import seedReports from "../data/reports.json";
import { useBlockchain } from "./BlockchainContext";

const ReportsContext = createContext();

const STORAGE_KEY = "centraldb_reports_v2";
const CHAIN_KEY = "centraldb_chain_v1";

function generateId(prefix = "r") {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Simple hash function for demo (not crypto-grade)
function simpleHash(obj) {
    const str = JSON.stringify(obj) + Math.random().toString(36).slice(2, 8);
    // create a short hash-like string
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
    return `h-${Math.abs(h).toString(36).slice(0, 10)}`;
}

export function ReportsProvider({ children }) {
    const { addBlock } = useBlockchain();
    const [reports, setReports] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
            return seedReports || [];
        } catch (e) {
            console.error("Failed to load reports from storage, using seed.", e);
            return seedReports || [];
        }
    });

    // blockchain-like chain (array of blocks)
    const [chain, setChain] = useState(() => {
        try {
            const raw = localStorage.getItem(CHAIN_KEY);
            if (raw) return JSON.parse(raw);
            return []; // start empty
        } catch (e) {
            console.error("Failed to load chain", e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
        } catch (e) {
            console.error("Failed to persist reports", e);
        }
    }, [reports]);

    useEffect(() => {
        try {
            localStorage.setItem(CHAIN_KEY, JSON.stringify(chain));
        } catch (e) {
            console.error("Failed to persist chain", e);
        }
    }, [chain]);

    // Add a new report (citizen) and push a block to the chain
    function addReport(reportPayload) {
        const newReport = {
            id: generateId("r"),
            type: reportPayload.type || "general",
            reporterName: reportPayload.reporterName || "Anonymous",
            reporterContact: reportPayload.reporterContact || "",
            relation: reportPayload.relation || "",
            missingName: reportPayload.missingName || "",
            missingAge: reportPayload.missingAge || null,
            missingGender: reportPayload.missingGender || "",
            lastSeenLocation: reportPayload.lastSeenLocation || "",
            lastSeenDate: reportPayload.lastSeenDate || "",
            description: reportPayload.description || "",
            photoURL: reportPayload.photoURL || "",
            status: "Pending", // Pending -> Verified -> Closed
            createdAt: new Date().toISOString(),
            assignedOfficer: null,
            verified: false
        };

        // prepend so newest show first
        setReports(prev => [newReport, ...prev]);

        // Push to blockchain
        addBlock({ type: "NEW_REPORT", payload: newReport });

        // return new report for use by caller
        return newReport;
    }

    // Police: verify report (mark verified)
    function verifyReport(id, officerName = null) {
        setReports(prev =>
            prev.map(r =>
                r.id === id
                    ? { ...r, verified: true, status: r.status === "Pending" ? "Verified" : r.status, assignedOfficer: officerName || r.assignedOfficer }
                    : r
            )
        );
        // Optionally push verification event to chain
        pushChainEvent({ type: "verify", reportId: id, officer: officerName || "Officer" });
    }

    // Change status (e.g., Close, Reopen)
    function updateStatus(id, newStatus) {
        setReports(prev => prev.map(r => (r.id === id ? { ...r, status: newStatus } : r)));
        pushChainEvent({ type: "status_change", reportId: id, newStatus });
    }

    // Assign officer
    function assignOfficer(id, officerName) {
        setReports(prev => prev.map(r => (r.id === id ? { ...r, assignedOfficer: officerName } : r)));
        pushChainEvent({ type: "assign", reportId: id, officer: officerName });
    }

    // Utility: find by id
    function getReportById(id) {
        return reports.find(r => r.id === id);
    }

    // remove (optional demo only)
    function removeReport(id) {
        setReports(prev => prev.filter(r => r.id !== id));
        pushChainEvent({ type: "remove", reportId: id });
    }

    // push a generic chain event (small block)
    function pushChainEvent(eventPayload) {
        const lastBlock = chain.length ? chain[chain.length - 1] : null;
        const block = {
            index: (lastBlock ? lastBlock.index + 1 : 1),
            timestamp: new Date().toISOString(),
            event: eventPayload,
            prevHash: lastBlock ? lastBlock.hash : "genesis",
            hash: simpleHash(eventPayload)
        };
        setChain(prev => [...prev, block]);
    }

    return (
        <ReportsContext.Provider
            value={{
                reports,
                chain,
                addReport,
                verifyReport,
                updateStatus,
                assignOfficer,
                getReportById,
                removeReport,
                pushChainEvent
            }}
        >
            {children}
        </ReportsContext.Provider>
    );
}

export function useReports() {
    return useContext(ReportsContext);
}
