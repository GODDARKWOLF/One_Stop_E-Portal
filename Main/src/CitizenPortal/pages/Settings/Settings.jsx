import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faShield,
    faBell,
    faLanguage,
    faToggleOn,
    faToggleOff,
    faSave,
    faEnvelope,
    faPhone,
    faGlobe,
    faKey,
    faEyeSlash,
    faEye
} from '@fortawesome/free-solid-svg-icons';
import './Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);

    // Mock data - replace with real data from backend
    const [settings, setSettings] = useState({
        profile: {
            email: "john.doe@example.com",
            phone: "+260 97X XXX XXX",
            language: "English",
            timezone: "Africa/Lusaka"
        },
        notifications: {
            emailNotifications: true,
            smsNotifications: true,
            taxReminders: true,
            documentUpdates: true,
            securityAlerts: true
        },
        security: {
            twoFactorAuth: false,
            loginAlerts: true,
            deviceHistory: true
        }
    });

    const handleToggle = (category, setting) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [setting]: !prev[category][setting]
            }
        }));
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Settings</h1>
                <p className="text-secondary">Manage your account preferences and settings</p>
            </div>

            <div className="settings-content">
                <div className="settings-navigation card">
                    <button
                        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <FontAwesomeIcon icon={faUser} />
                        Profile Settings
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <FontAwesomeIcon icon={faShield} />
                        Security
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <FontAwesomeIcon icon={faBell} />
                        Notifications
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preferences')}
                    >
                        <FontAwesomeIcon icon={faLanguage} />
                        Preferences
                    </button>
                </div>

                <div className="settings-panel card">
                    {activeTab === 'profile' && (
                        <div className="settings-section slide-in-right">
                            <h2>Profile Settings</h2>
                            <div className="form-group">
                                <label>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={settings.profile.email}
                                    className="input"
                                    onChange={() => { }}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <FontAwesomeIcon icon={faPhone} />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={settings.profile.phone}
                                    className="input"
                                    onChange={() => { }}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <FontAwesomeIcon icon={faGlobe} />
                                    Language
                                </label>
                                <select className="input" defaultValue={settings.profile.language}>
                                    <option value="English">English</option>
                                    <option value="Nyanja">Nyanja</option>
                                    <option value="Bemba">Bemba</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>
                                    <FontAwesomeIcon icon={faGlobe} />
                                    Timezone
                                </label>
                                <select className="input" defaultValue={settings.profile.timezone}>
                                    <option value="Africa/Lusaka">Africa/Lusaka (GMT+2)</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-section slide-in-right">
                            <h2>Security Settings</h2>
                            <div className="security-section">
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h3>Two-Factor Authentication</h3>
                                        <p>Add an extra layer of security to your account</p>
                                    </div>
                                    <button
                                        className="toggle-btn"
                                        onClick={() => handleToggle('security', 'twoFactorAuth')}
                                    >
                                        <FontAwesomeIcon
                                            icon={settings.security.twoFactorAuth ? faToggleOn : faToggleOff}
                                            className={settings.security.twoFactorAuth ? 'on' : ''}
                                        />
                                    </button>
                                </div>

                                <div className="password-section">
                                    <h3>Change Password</h3>
                                    <div className="form-group">
                                        <label>
                                            <FontAwesomeIcon icon={faKey} />
                                            Current Password
                                        </label>
                                        <div className="password-input">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="input"
                                            />
                                            <button
                                                className="toggle-password"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <FontAwesomeIcon icon={faKey} />
                                            New Password
                                        </label>
                                        <div className="password-input">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="input"
                                            />
                                            <button
                                                className="toggle-password"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section slide-in-right">
                            <h2>Notification Preferences</h2>
                            <div className="notification-settings">
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h3>Email Notifications</h3>
                                        <p>Receive updates via email</p>
                                    </div>
                                    <button
                                        className="toggle-btn"
                                        onClick={() => handleToggle('notifications', 'emailNotifications')}
                                    >
                                        <FontAwesomeIcon
                                            icon={settings.notifications.emailNotifications ? faToggleOn : faToggleOff}
                                            className={settings.notifications.emailNotifications ? 'on' : ''}
                                        />
                                    </button>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h3>SMS Notifications</h3>
                                        <p>Receive updates via SMS</p>
                                    </div>
                                    <button
                                        className="toggle-btn"
                                        onClick={() => handleToggle('notifications', 'smsNotifications')}
                                    >
                                        <FontAwesomeIcon
                                            icon={settings.notifications.smsNotifications ? faToggleOn : faToggleOff}
                                            className={settings.notifications.smsNotifications ? 'on' : ''}
                                        />
                                    </button>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <h3>Tax Reminders</h3>
                                        <p>Get notified about upcoming tax deadlines</p>
                                    </div>
                                    <button
                                        className="toggle-btn"
                                        onClick={() => handleToggle('notifications', 'taxReminders')}
                                    >
                                        <FontAwesomeIcon
                                            icon={settings.notifications.taxReminders ? faToggleOn : faToggleOff}
                                            className={settings.notifications.taxReminders ? 'on' : ''}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="settings-actions">
                        <button className="btn btn-primary">
                            <FontAwesomeIcon icon={faSave} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;