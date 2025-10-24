import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#F8FAFF',
            gap: '20px'
        }}>
            <h1 style={{ color: '#002BFF' }}>Welcome to Citizen Portal</h1>
            <Link
                to="/dashboard"
                style={{
                    background: 'linear-gradient(90deg, #002BFF, #0055FF)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}
            >
                Go to Dashboard
            </Link>
        </div>
    )
}