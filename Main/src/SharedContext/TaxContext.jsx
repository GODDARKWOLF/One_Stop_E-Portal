import React, { createContext, useState, useEffect, useContext } from "react";

export const TaxContext = createContext();

export const TaxProvider = ({ children }) => {
    const [taxRecords, setTaxRecords] = useState(() => {
        const saved = localStorage.getItem("taxRecords");
        return saved ? JSON.parse(saved) : [];
    });

    // persist to localStorage
    useEffect(() => {
        localStorage.setItem("taxRecords", JSON.stringify(taxRecords));
    }, [taxRecords]);

    const addTaxRecord = (record) => {
        const newRecord = {
            id: Date.now().toString(),
            citizenName: record.citizenName,
            fileName: record.fileName,
            status: "Pending",
            timestamp: new Date().toLocaleString(),
        };
        setTaxRecords((prev) => [newRecord, ...prev]);
        // Don't add to blockchain until approved by ZRA
    };

    const updateTaxStatus = (id, newStatus) => {
        setTaxRecords((prev) =>
            prev.map((record) =>
                record.id === id ? { ...record, status: newStatus } : record
            )
        );
    };

    const deleteTaxRecord = (id) => {
        setTaxRecords((prev) => prev.filter((record) => record.id !== id));
    };

    return (
        <TaxContext.Provider value={{
            taxRecords,
            addTaxRecord,
            updateTaxStatus,
            deleteTaxRecord
        }}>
            {children}
        </TaxContext.Provider>
    );
};

// Custom hook for using tax context
export const useTax = () => {
    const context = useContext(TaxContext);
    if (!context) {
        throw new Error('useTax must be used within a TaxProvider');
    }
    return context;
};