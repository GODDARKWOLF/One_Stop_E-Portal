import React from 'react'

const docs = [
    { name: 'Passport', code: 'P-12345', exp: '2030-01-01' },
    { name: 'Driver License', code: 'D-9988', exp: '2026-05-12' },
    { name: 'Birth Cert', code: 'B-4432', exp: '-' }
]

export default function DocumentsCard() {
    return (
        <div className="card documents fadeIn">
            <h3>My Documents (3)</h3>
            {docs.map(d => (
                <div key={d.code} className="document-item">
                    <div className="document-meta">
                        <strong>{d.name}</strong>
                        <small>ID: {d.code} • Exp: {d.exp}</small>
                    </div>
                    <div className="badge">Active</div>
                </div>
            ))}
        </div>
    )
}

