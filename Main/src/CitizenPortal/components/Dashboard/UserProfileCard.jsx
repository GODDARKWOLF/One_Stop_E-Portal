import React, { useState } from 'react'
import './dashboard.css'

export default function UserProfileCard() {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState({
        name: "Rival Person",
        role: "Citizen",
        dob: "1990-01-01",
        email: "rival@example.com",
        id: "1234-5678",
        phone: "+1 555 1234",
        avatar: "https://via.placeholder.com/90"
    })

    const [tempProfile, setTempProfile] = useState({ ...profile })

    const handleEdit = () => {
        setTempProfile({ ...profile })
        setIsEditing(true)
    }

    const handleSave = () => {
        setProfile({ ...tempProfile })
        setIsEditing(false)
        // Here you would typically make an API call to save the data
        console.log('Profile saved:', tempProfile)
    }

    const handleCancel = () => {
        setTempProfile({ ...profile })
        setIsEditing(false)
    }

    const handleChange = (field, value) => {
        setTempProfile(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                handleChange('avatar', e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="profile-card fadeIn">
            <div className="profile-top">
                <div className="avatar-container">
                    <img src={profile.avatar} alt="avatar" />
                    {isEditing && (
                        <div className="avatar-overlay">
                            <label htmlFor="avatar-upload" className="upload-label">
                                📷 Change
                            </label>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                    )}
                </div>
                <div className="meta">
                    {isEditing ? (
                        <input
                            type="text"
                            value={tempProfile.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="edit-input name-input"
                            placeholder="Full Name"
                        />
                    ) : (
                        <div className="name">{profile.name}</div>
                    )}
                    <div className="role">{profile.role}</div>
                </div>
            </div>

            <div className="info">
                <div className="info-item">
                    <span className="label">DOB:</span>
                    {isEditing ? (
                        <input
                            type="date"
                            value={tempProfile.dob}
                            onChange={(e) => handleChange('dob', e.target.value)}
                            className="edit-input"
                        />
                    ) : (
                        <span>{profile.dob}</span>
                    )}
                </div>

                <div className="info-item">
                    <span className="label">Email:</span>
                    {isEditing ? (
                        <input
                            type="email"
                            value={tempProfile.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="edit-input"
                            placeholder="email@example.com"
                        />
                    ) : (
                        <span>{profile.email}</span>
                    )}
                </div>

                <div className="info-item">
                    <span className="label">ID:</span>
                    {isEditing ? (
                        <input
                            type="text"
                            value={tempProfile.id}
                            onChange={(e) => handleChange('id', e.target.value)}
                            className="edit-input"
                            placeholder="ID Number"
                        />
                    ) : (
                        <span>{profile.id}</span>
                    )}
                </div>

                <div className="info-item">
                    <span className="label">Phone:</span>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={tempProfile.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="edit-input"
                            placeholder="+1 555 1234"
                        />
                    ) : (
                        <span>{profile.phone}</span>
                    )}
                </div>
            </div>

            <div className="action-buttons">
                {isEditing ? (
                    <>
                        <button className="save-btn" onClick={handleSave}>
                            💾 Save Changes
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                            ❌ Cancel
                        </button>
                    </>
                ) : (
                    <button className="edit-btn" onClick={handleEdit}>
                        ✏️ Edit Profile
                    </button>
                )}
            </div>
        </div>
    )
}