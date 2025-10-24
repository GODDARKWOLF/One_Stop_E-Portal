import React from 'react'
import DashboardLayout from './DashboardLayout'
import UserProfileCard from './UserProfileCard'
import DocumentsCard from './DocumentsCard'
import OngoingLifeEvents from './OngoingLifeEvents'
import RelativesList from './RelativesList'
import AssetsList from './AssetsList'
import NotificationsPanel from './NotificationsPanel'
import LifeEventTimeline from './LifeEventTimeline'

export default function CitizenDashboard() {
    return (
        <DashboardLayout>
            <div className="content-grid">
                {/* Left column */}
                <div className="left-column">
                    <UserProfileCard />
                    <DocumentsCard />
                </div>

                {/* Center column */}
                <div className="center-column">
                    <OngoingLifeEvents />
                    <RelativesList />
                    <AssetsList />
                </div>

                {/* Right column */}
                <div className="right-column">
                    <NotificationsPanel />
                    <LifeEventTimeline />
                </div>
            </div>
        </DashboardLayout>
    )
}