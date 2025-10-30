import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TaxProvider } from "./SharedContext/TaxContext";
import { BlockchainProvider } from "./SharedContext/BlockchainContext";

// --- Welcome Page ---
import Welcome from "./Welcome/welcome";

// --- Citizen Portal ---
import {
  CitizenLayout,
  Dashboard,
  Documents,
  Activities,
  Tax,
  LifeEvents,
  Relatives,
  Settings,
  CitizenBlockchainViewer,
} from "./CitizenPortal";

// --- Gov Portal ---
import GovDashboardLayout from "./GovPortal/components/GovDashboardLayout";
import GovDashboardPage from "./GovPortal/GovDashboard/pages/GovDashboardPage";
import Citizens from "./GovPortal/GovDashboard/pages/Citizens";
import TaxRecords from "./GovPortal/GovDashboard/pages/TaxRecords";
import Reports from "./GovPortal/GovDashboard/pages/Reports";
import Alerts from "./GovPortal/GovDashboard/pages/Alerts";
import GovSettings from "./GovPortal/GovDashboard/pages/GovSettings";
import Logout from "./GovPortal/GovDashboard/pages/Logout";
import Blockchain from "./GovPortal/GovDashboard/pages/BlockchainViewer";

// --- Police Portal ---
import PoliceDashboardLayout from "./PolicePortal/pages/PoliceDashboardLayout";
import PoliceDashboard from "./PolicePortal/pages/Dashboard";
import Officers from "./PolicePortal/pages/Officers";
import PoliceReports from "./PolicePortal/pages/Reports";
import Cases from "./PolicePortal/pages/Cases";
import Surveillance from "./PolicePortal/pages/Surveillance";
import PoliceSettings from "./PolicePortal/pages/Settings";
import PoliceLogout from "./PolicePortal/pages/Logout";

import "./App.css";

function App() {
  return (
    <div className="app">
      <TaxProvider>
        <BlockchainProvider> {/* ✅ Wrap everything here */}
          <Router>
            <Routes>
              {/* --- Welcome Page --- */}
              <Route path="/" element={<Welcome />} />

              {/* --- Citizen Portal --- */}
              <Route path="/citizen" element={<CitizenLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="documents" element={<Documents />} />
                <Route path="activities" element={<Activities />} />
                <Route path="tax" element={<Tax />} />
                <Route path="life-events" element={<LifeEvents />} />
                <Route path="relatives" element={<Relatives />} />
                <Route path="citizenblockchain" element={<CitizenBlockchainViewer />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* --- Gov Portal --- */}
              <Route path="/gov" element={<GovDashboardLayout />}>
                <Route index element={<GovDashboardPage />} />
                <Route path="citizens" element={<Citizens />} />
                <Route path="tax-records" element={<TaxRecords />} />
                <Route path="reports" element={<Reports />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="blockchain" element={<Blockchain />} />
                <Route path="settings" element={<GovSettings />} />
                <Route path="logout" element={<Logout />} />
              </Route>

              {/* --- Police Portal --- */}
              <Route path="/police" element={<PoliceDashboardLayout />}>
                <Route index element={<PoliceDashboard />} />
                <Route path="officers" element={<Officers />} />
                <Route path="reports" element={<PoliceReports />} />
                <Route path="cases" element={<Cases />} />
                <Route path="surveillance" element={<Surveillance />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="settings" element={<PoliceSettings />} />
                <Route path="logout" element={<PoliceLogout />} />
              </Route>

              {/* --- Catch All --- */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </BlockchainProvider>
      </TaxProvider>
    </div>
  );
}

export default App;