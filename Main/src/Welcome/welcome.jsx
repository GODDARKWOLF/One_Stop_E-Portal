// src/Welcome/welcome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';
import './welcome.css';

export default function Welcome() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            const user = login(email, password);
            if (user) {
                if (user.role === 'citizen') navigate('/citizen');
                else if (user.role === 'zra') navigate('/gov');
                else if (user.role === 'police') navigate('/police');
            } else {
                setError('Invalid credentials. Try: citizen@example.com / 123456');
            }
        } else {
            alert('Signup simulated — this demo does not persist new users.');
        }
        setEmail(''); setPassword('');
    };

    return (
        <div className="welcome-container">
            <div className="welcome-card slideUp">
                <h1 className="welcome-title">Welcome to the <span>Central Hub</span></h1>
                <p className="welcome-sub">We try our best to reach 80% everyday ...</p>

                <form onSubmit={handleSubmit} className="auth-form fadeIn">
                    <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button type="submit" className="auth-btn">{isLogin ? 'Login' : 'Create Account'}</button>
                    {error && <p className="error-text" style={{ color: '#ffb3b3' }}>{error}</p>}
                </form>

                <p className="toggle-text">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="toggle-btn">
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}
