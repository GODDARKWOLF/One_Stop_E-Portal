import React from 'react'

export default function TopNavBar(){
	return (
		<div className="top-nav">
			<div className="left"></div>
			<div className="search">
				<input type="text" placeholder="Search for services, documents or events..." />
			</div>
			<div className="profile">
				<div className="avatar">RP</div>
				<div className="name">Rival</div>
			</div>
		</div>
	)
}
