import React, { useState } from 'react';

const GeneralReportForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        incidentDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 15 }}>
                <label htmlFor="title" style={{ display: 'block', marginBottom: 5 }}>Report Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Public Disturbance, Theft Report"
                    required
                    style={inputStyle}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: 5 }}>Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a detailed description of the incident."
                    rows="4"
                    required
                    style={{
                        ...inputStyle,
                        resize: 'vertical'
                    }}
                ></textarea>
            </div>

            <div style={{ marginBottom: 15 }}>
                <label htmlFor="location" style={{ display: 'block', marginBottom: 5 }}>Location of Incident:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Main Street, Near Central Park"
                    required
                    style={inputStyle}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <label htmlFor="incidentDate" style={{ display: 'block', marginBottom: 5 }}>Date of Incident:</label>
                <input
                    type="date"
                    id="incidentDate"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" onClick={onCancel} style={cancelButtonStyle}>Cancel</button>
                <button type="submit" style={submitButtonStyle}>Submit Report</button>
            </div>
        </form>
    );
};

const inputStyle = {
    width: '100%',
    padding: 8,
    border: '1px solid #ddd',
    borderRadius: 4,
    boxSizing: 'border-box'
};

const submitButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16
};

const cancelButtonStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16
};

export default GeneralReportForm;