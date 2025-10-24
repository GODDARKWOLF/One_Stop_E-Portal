import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faIdCard, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './ProfileCard.css';

const ProfileCard = ({
    user = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+260 97X XXX XXX",
        nrc: "999999/99/9",
        profileComplete: 85,
        isVerified: true,
        avatarUrl: null
    }
}) => {
    // Generate initials for avatar fallback
    const initials = user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();

    return (
        <div className="profile-card card slide-in-up">
            <div className="profile-header">
                <div className="avatar-wrapper">
                    {user.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="avatar-image"
                        />
                    ) : (
                        <div className="avatar-fallback">
                            {initials}
                        </div>
                    )}
                    {user.isVerified && (
                        <div className="verified-badge" title="Verified Account">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                    )}
                </div>

                <div className="profile-completion">
                    <div className="completion-text">
                        Profile Completion
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${user.profileComplete}%` }}
                        >
                            <span className="progress-text">
                                {user.profileComplete}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-info">
                <div className="info-item">
                    <FontAwesomeIcon icon={faUser} className="info-icon" />
                    <div className="info-content">
                        <label>Full Name</label>
                        <span>{user.name}</span>
                    </div>
                </div>

                <div className="info-item">
                    <FontAwesomeIcon icon={faIdCard} className="info-icon" />
                    <div className="info-content">
                        <label>NRC Number</label>
                        <span>{user.nrc}</span>
                    </div>
                </div>

                <div className="info-item">
                    <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
                    <div className="info-content">
                        <label>Email Address</label>
                        <span>{user.email}</span>
                    </div>
                </div>

                <div className="info-item">
                    <FontAwesomeIcon icon={faPhone} className="info-icon" />
                    <div className="info-content">
                        <label>Phone Number</label>
                        <span>{user.phone}</span>
                    </div>
                </div>
            </div>

            <div className="profile-actions">
                <button className="btn btn-primary">
                    Edit Profile
                </button>
                <button className="btn btn-secondary">
                    View Documents
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;