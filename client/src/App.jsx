import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import CrmDashboard from './modules/crm';
import ErpDashboard from './modules/erp';
import SettingsDashboard from './modules/settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          {/* Default redirect to CRM */}
          <Route index element={<Navigate to="/crm" replace />} />

          <Route path="crm/*" element={<CrmDashboard />} />
          <Route path="erp/*" element={<ErpDashboard />} />
          <Route path="settings/*" element={<SettingsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
