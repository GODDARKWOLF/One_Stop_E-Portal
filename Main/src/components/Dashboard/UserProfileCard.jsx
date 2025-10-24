import React from 'react'

export default function UserProfileCard(){
	return (
		<div className="profile-card fadeIn">
			<div className="profile-top">
				<img src="https://via.placeholder.com/90" alt="avatar" />
				<div className="meta">
					<div className="name">Rival Person</div>
					<div className="role">Citizen</div>
				</div>
			</div>
			<div className="info">
				<div>DOB: 1990-01-01</div>
				<div>Email: rival@example.com</div>
				<div>ID: 1234-5678</div>
				<div>Phone: +1 555 1234</div>
			</div>
			<button className="edit">Edit Profile</button>
		</div>
	)
}
