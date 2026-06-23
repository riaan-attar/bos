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
import OrganizationList from './modules/crm/organizations/OrganizationList';
import OrganizationDetail from './modules/crm/organizations/OrganizationDetail';
import Desk from './modules/desk';
import ProjectsDashboard from './modules/projects';
import ProjectList from './modules/projects/ProjectList';
import ProjectDetail from './modules/projects/ProjectDetail';
import TaskList from './modules/projects/TaskList';
import TaskDetail from './modules/projects/TaskDetail';
import TimesheetList from './modules/projects/TimesheetList';
import TimesheetDetail from './modules/projects/TimesheetDetail';

// Project Setup
import ActivityType from './modules/projects/setup/ActivityType';
import ActivityCost from './modules/projects/setup/ActivityCost';
import ProjectTemplate from './modules/projects/setup/ProjectTemplate';
import ProjectType from './modules/projects/setup/ProjectType';
import ProjectUpdate from './modules/projects/setup/ProjectUpdate';

// Project Reports
import ProjectSummary from './modules/projects/reports/ProjectSummary';
import DailyTimesheetSummary from './modules/projects/reports/DailyTimesheetSummary';
import TimesheetBillingSummary from './modules/projects/reports/TimesheetBillingSummary';
import ProjectWiseStock from './modules/projects/reports/ProjectWiseStock';
import DelayedTasksSummary from './modules/projects/reports/DelayedTasksSummary';

// Project Utils
import ProjectsSearch from './modules/projects/ProjectsSearch';
import ProjectsSettings from './modules/projects/ProjectsSettings';
import GettingStarted from './modules/projects/GettingStarted';


import NotesPage from './modules/crm/notes/NotesPage';
import TasksPage from './modules/crm/tasks/TasksPage';
import CallLogsPage from './modules/crm/calllogs/CallLogsPage';
import EmailTemplatesPage from './modules/crm/emailtemplates/EmailTemplatesPage';
import { LeadsProvider } from './context/LeadsContext';
import { OpportunitiesProvider } from './context/OpportunitiesContext';
import { CustomersProvider } from './context/CustomersContext';
import { ContactsProvider } from './context/ContactsContext';
import { MaintenanceProvider } from './context/MaintenanceContext';
import { ContractsProvider } from './context/ContractsContext';
import { CommunicationsProvider } from './context/CommunicationsContext';
import { CampaignsProvider } from './context/CampaignsContext';
import { OrganizationsProvider } from './context/OrganizationsContext';
import { NotesProvider } from './context/NotesContext';
import { TasksProvider } from './context/TasksContext';
import { CallLogsProvider } from './context/CallLogsContext';
import { EmailTemplatesProvider } from './context/EmailTemplatesContext';
import { ProjectsProvider } from './context/ProjectsContext';

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
    <ProjectsProvider>
    <LeadsProvider>
      <OpportunitiesProvider>
        <ContactsProvider>
        <MaintenanceProvider>
        <CustomersProvider>
          <ContractsProvider>
            <CommunicationsProvider>
              <CampaignsProvider>
                <OrganizationsProvider>
                <NotesProvider>
                <TasksProvider>
                <CallLogsProvider>
                <EmailTemplatesProvider>
                  <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<AppShell />}>
                      <Route index element={<Desk />} />
                      <Route path="desk" element={<Desk />} />

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
                      <Route path="crm/organizations" element={<OrganizationList />} />
                      <Route path="crm/organizations/:id" element={<OrganizationDetail />} />
                      <Route path="crm/notes" element={<NotesPage />} />
                      <Route path="crm/tasks" element={<TasksPage />} />
                      <Route path="crm/call-logs" element={<CallLogsPage />} />
                      <Route path="crm/email-templates" element={<EmailTemplatesPage />} />
                      <Route path="crm/incoming-calls" element={<Placeholder title="Incoming Calls" />} />
                      <Route path="notifications" element={<Placeholder title="Notifications" />} />

                      <Route path="crm/*" element={<CrmDashboard />} />
                      <Route path="erp/*" element={<ErpDashboard />} />
                      <Route path="settings/*" element={<SettingsDashboard />} />
                      
                      {/* Projects Module Routes */}
                      <Route path="projects" element={<ProjectsDashboard />} />
                      <Route path="projects/project" element={<ProjectList />} />
                      <Route path="projects/project/:id" element={<ProjectDetail />} />
                      <Route path="projects/task" element={<TaskList />} />
                      <Route path="projects/task/:id" element={<TaskDetail />} />
                      <Route path="projects/timesheet" element={<TimesheetList />} />
                      <Route path="projects/timesheet/:id" element={<TimesheetDetail />} />

                      <Route path="projects/setup/activity-type" element={<ActivityType />} />
                      <Route path="projects/setup/activity-cost" element={<ActivityCost />} />
                      <Route path="projects/setup/project-template" element={<ProjectTemplate />} />
                      <Route path="projects/setup/project-type" element={<ProjectType />} />
                      <Route path="projects/setup/project-update" element={<ProjectUpdate />} />
                      <Route path="projects/reports/project-summary" element={<ProjectSummary />} />
                      <Route path="projects/reports/daily-timesheet-summary" element={<DailyTimesheetSummary />} />
                      <Route path="projects/reports/timesheet-billing-summary" element={<TimesheetBillingSummary />} />
                      <Route path="projects/reports/project-wise-stock-tracking" element={<ProjectWiseStock />} />
                      <Route path="projects/reports/delayed-tasks-summary" element={<DelayedTasksSummary />} />
                      <Route path="projects/settings" element={<ProjectsSettings />} />
                      <Route path="projects/getting-started" element={<GettingStarted />} />
                      <Route path="projects/search" element={<ProjectsSearch />} />
                    </Route>

                  </Routes>
                  </BrowserRouter>
                </EmailTemplatesProvider>
                </CallLogsProvider>
                </TasksProvider>
                </NotesProvider>
                </OrganizationsProvider>
              </CampaignsProvider>
            </CommunicationsProvider>
          </ContractsProvider>
        </CustomersProvider>
        </MaintenanceProvider>
        </ContactsProvider>
      </OpportunitiesProvider>
    </LeadsProvider>
    </ProjectsProvider>
  );
}
