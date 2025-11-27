import React, { useState } from 'react';

const MissingRelativeForm = ({ relative, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        lastSeenDate: '',
        lastSeenLocation: '',
        description: ''
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
            <p>Reporting <strong>{relative.name}</strong> ({relative.relation}) as missing.</p>

            <div style={{ marginBottom: 15 }}>
                <label htmlFor="lastSeenDate" style={{ display: 'block', marginBottom: 5 }}>Last Seen Date:</label>
                <input
                    type="date"
                    id="lastSeenDate"
                    name="lastSeenDate"
                    value={formData.lastSeenDate}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <label htmlFor="lastSeenLocation" style={{ display: 'block', marginBottom: 5 }}>Last Seen Location:</label>
                <input
                    type="text"
                    id="lastSeenLocation"
                    name="lastSeenLocation"
                    value={formData.lastSeenLocation}
                    onChange={handleChange}
                    placeholder="e.g., City Market, Home Address"
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
                    placeholder="Any additional details (e.g., what they were wearing, last known activities)"
                    rows="4"
                    style={{
                        ...inputStyle,
                        resize: 'vertical'
                    }}
                ></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" onClick={onCancel} style={cancelButtonStyle}>Cancel</button>
                <button type="submit" style={submitButtonStyle}>Confirm Report</button>
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
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16
};

const cancelButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16
};

export default MissingRelativeForm;