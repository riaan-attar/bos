import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Construction } from 'lucide-react';
import AppShell from './components/layout/AppShell';
import CrmDashboard from './modules/crm';
import LeadList from './modules/crm/leads/LeadList';
import LeadDetail from './modules/crm/leads/LeadDetail';
import OpportunityList from './modules/crm/opportunities/OpportunityList';
import OpportunityDetail from './modules/crm/opportunities/OpportunityDetail';
import DealList from './modules/crm/deals/DealList';
import DealDetail from './modules/crm/deals/DealDetail';
import CustomerList from './modules/crm/customers/CustomerList';
import CustomerDetail from './modules/crm/customers/CustomerDetail';
import ContactList from './modules/crm/contacts/ContactList';
import MaintenanceList from './modules/crm/maintenance/MaintenanceList';
import SalesPipeline from './modules/crm/pipeline/SalesPipeline';
import ContractList from './modules/crm/contracts/ContractList';
import CommunicationList from './modules/crm/communications/CommunicationList';
import CampaignList from './modules/crm/campaigns/CampaignList';
import ErpDashboard from './modules/erp';
import SettingsDashboard from './modules/settings';
import { LeadsProvider } from './context/LeadsContext';
import { OpportunitiesProvider } from './context/OpportunitiesContext';
import { CustomersProvider } from './context/CustomersContext';
import { ContactsProvider } from './context/ContactsContext';
import { MaintenanceProvider } from './context/MaintenanceContext';
import { ContractsProvider } from './context/ContractsContext';
import { CommunicationsProvider } from './context/CommunicationsContext';
import { CampaignsProvider } from './context/CampaignsContext';

const Placeholder = ({ title }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    background: '#0f0f0f',
    color: '#383838',
    gap: 12,
  }}>
    <Construction size={40} strokeWidth={1} />
    <p style={{ fontSize: 14 }}>
      {title} — Coming Soon
    </p>
  </div>
);

export default function App() {
  return (
    <LeadsProvider>
      <OpportunitiesProvider>
        <ContactsProvider>
        <MaintenanceProvider>
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
                      <Route path="crm/deals/:id" element={<DealDetail />} />
                      <Route path="crm/deals" element={<DealList />} />
                      <Route path="crm/opportunities/:id" element={<OpportunityDetail />} />
                      <Route path="crm/opportunities" element={<OpportunityList />} />
                      <Route path="crm/customers/:id" element={<CustomerDetail />} />
                      <Route path="crm/customers" element={<CustomerList />} />
                      <Route path="crm/contacts" element={<ContactList />} />
                      <Route path="crm/maintenance" element={<MaintenanceList />} />
                      <Route path="crm/pipeline" element={<SalesPipeline />} />
                      <Route path="crm/contracts" element={<ContractList />} />
                      <Route path="crm/communications" element={<CommunicationList />} />
                      <Route path="crm/campaigns" element={<CampaignList />} />
                      
                      {/* Placeholders */}
                      <Route path="crm/organizations" element={<Placeholder title="Organizations" />} />
                      <Route path="crm/notes" element={<Placeholder title="Notes" />} />
                      <Route path="crm/tasks" element={<Placeholder title="Tasks" />} />
                      <Route path="crm/call-logs" element={<Placeholder title="Call Logs" />} />
                      <Route path="crm/email-templates" element={<Placeholder title="Email Templates" />} />
                      <Route path="crm/incoming-calls" element={<Placeholder title="Incoming Calls" />} />
                      <Route path="notifications" element={<Placeholder title="Notifications" />} />

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
        </MaintenanceProvider>
        </ContactsProvider>
      </OpportunitiesProvider>
    </LeadsProvider>
  );
}
