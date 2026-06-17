import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import CrmDashboard from './modules/crm';
import LeadList from './modules/crm/leads/LeadList';
import LeadDetail from './modules/crm/leads/LeadDetail';
import OpportunityList from './modules/crm/opportunities/OpportunityList';
import CustomerList from './modules/crm/customers/CustomerList';
import ContractList from './modules/crm/contracts/ContractList';
import CommunicationList from './modules/crm/communications/CommunicationList';
import CampaignList from './modules/crm/campaigns/CampaignList';
import ErpDashboard from './modules/erp';
import SettingsDashboard from './modules/settings';
import { LeadsProvider } from './context/LeadsContext';
import { OpportunitiesProvider } from './context/OpportunitiesContext';
import { CustomersProvider } from './context/CustomersContext';
import { ContractsProvider } from './context/ContractsContext';
import { CommunicationsProvider } from './context/CommunicationsContext';
import { CampaignsProvider } from './context/CampaignsContext';

export default function App() {
  return (
    <LeadsProvider>
      <OpportunitiesProvider>
        <CustomersProvider>
          <ContractsProvider>
            <CommunicationsProvider>
              <CampaignsProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<AppShell />}>
                      {/* Default redirect to CRM */}
                      <Route index element={<Navigate to="/crm" replace />} />

                      <Route path="crm/leads/:id" element={<LeadDetail />} />
                      <Route path="crm/leads" element={<LeadList />} />
                      <Route path="crm/opportunities" element={<OpportunityList />} />
                      <Route path="crm/customers" element={<CustomerList />} />
                      <Route path="crm/contracts" element={<ContractList />} />
                      <Route path="crm/communications" element={<CommunicationList />} />
                      <Route path="crm/campaigns" element={<CampaignList />} />
                      <Route path="crm/*" element={<CrmDashboard />} />
                      <Route path="erp/*" element={<ErpDashboard />} />
                      <Route path="settings/*" element={<SettingsDashboard />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </CampaignsProvider>
            </CommunicationsProvider>
          </ContractsProvider>
        </CustomersProvider>
      </OpportunitiesProvider>
    </LeadsProvider>
  );
}
