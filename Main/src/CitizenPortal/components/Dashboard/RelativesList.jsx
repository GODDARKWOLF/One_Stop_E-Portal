import React from 'react'

const relatives = [
    { id: 1, name: 'Jane Doe', relation: 'Spouse', idnum: 'R-4321', dob: '1992-06-21', dependent: true },
    { id: 2, name: 'John Junior', relation: 'Son', idnum: 'R-4322', dob: '2015-08-11', dependent: true },
]

export default function RelativesList() {
    return (
        <div className="card relatives fadeIn">
            <h3>My Relatives</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {relatives.map(r => (
                    <div key={r.id} className="relative-row card">
                        <img src={`https://via.placeholder.com/40`} alt="a" style={{ width: 40, height: 40, borderRadius: 8 }} />
                        <div>
                            <strong>{r.name}</strong>
                            <div style={{ fontSize: 12, color: '#666' }}>{r.relation} • {r.idnum}</div>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>{r.dependent && <span className="relative-tag">My Dependent</span>}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

