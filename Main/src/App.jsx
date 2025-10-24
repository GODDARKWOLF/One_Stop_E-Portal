import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  CitizenLayout,
  Dashboard,
  Documents,
  TaxRecords,
  Activities,
  LifeEvents,
  Relatives,
  Settings
} from './CitizenPortal';

import DashboardPage from "./GovPortal/GovDashboard/pages/DashboardPage";
import GovDashboardLayout from "./GovPortal/components/GovDashboardLayout";

import Citizens from "./GovPortal/GovDashboard/pages/Citizens";
import Revenue from "./GovPortal/GovDashboard/pages/Revenue";
import Reports from "./GovPortal/GovDashboard/pages/Reports";
import Alerts from "./GovPortal/GovDashboard/pages/Alerts";
import GovSettings from "./GovPortal/GovDashboard/pages/GovSettings";
import Logout from "./GovPortal/GovDashboard/pages/Logout";


import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          {/* Redirect root to citizen dashboard */}
          <Route path="/" element={<Navigate to="/citizen" replace />} />

          {/* Citizen Portal Routes */}
          <Route path="/citizen" element={<CitizenLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="documents" element={<Documents />} />
            <Route path="tax-records" element={<TaxRecords />} />
            <Route path="activities" element={<Activities />} />
            <Route path="life-events" element={<LifeEvents />} />
            <Route path="relatives" element={<Relatives />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Gov Portal Routes */}
          <Route path="/gov" element={<GovDashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="citizens" element={<Citizens />} />
            <Route path="revenue" element={<Revenue />} />
            <Route path="reports" element={<Reports />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="settings" element={<GovSettings />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          {/* Catch all route - redirect to citizen dashboard */}
          <Route path="*" element={<Navigate to="/citizen" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
