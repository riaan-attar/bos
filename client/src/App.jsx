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

// Stock Module
import StockDashboard from './modules/stock/StockDashboard';
import StockEntry from './modules/stock/StockEntry';
import PurchaseReceipt from './modules/stock/PurchaseReceipt';
import DeliveryNote from './modules/stock/DeliveryNote';
import MaterialRequest from './modules/stock/MaterialRequest';
import PickList from './modules/stock/PickList';

// Stock Tools
import SerialNo from './modules/stock/tools/SerialNo';
import Batch from './modules/stock/tools/Batch';
import QualityInspection from './modules/stock/tools/QualityInspection';

// Stock Setup
import Warehouse from './modules/stock/setup/Warehouse';
import Item from './modules/stock/setup/Item';
import ItemGroup from './modules/stock/setup/ItemGroup';
import UnitOfMeasure from './modules/stock/setup/UnitOfMeasure';

// Stock Reports
import StockLedger from './modules/stock/reports/StockLedger';
import StockBalance from './modules/stock/reports/StockBalance';
import WarehouseWiseStock from './modules/stock/reports/WarehouseWiseStock';
import ItemPrices from './modules/stock/reports/ItemPrices';

// Stock Settings & Utils
import StockSettings from './modules/stock/StockSettings';
import StockGettingStarted from './modules/stock/StockGettingStarted';

// Payments Module
import PaymentsDashboard from './modules/payments/PaymentsDashboard';
import PaymentsPaymentEntry from './modules/payments/PaymentEntry';
import PaymentsJournalEntry from './modules/payments/JournalEntry';
import PaymentsPaymentRequest from './modules/payments/PaymentRequest';
import PaymentsPaymentOrder from './modules/payments/PaymentOrder';
import PaymentsPaymentReconciliation from './modules/payments/PaymentReconciliation';
import PaymentsUnreconcilePayment from './modules/payments/UnreconcilePayment';
import PaymentsProcessPaymentReco from './modules/payments/ProcessPaymentReco';
import PaymentsRepostAccountingLedger from './modules/payments/RepostAccountingLedger';
import PaymentsRepostPaymentLedger from './modules/payments/RepostPaymentLedger';

// Invoicing Module
import InvoicingDashboard from './modules/invoicing/InvoicingDashboard';
import ChartOfAccounts from './modules/invoicing/ChartOfAccounts';
import InvoicingSettings from './modules/invoicing/InvoicingSettings';
import InvoicingGettingStarted from './modules/invoicing/InvoicingGettingStarted';
// Invoicing Receivables
import InvCustomer from './modules/invoicing/receivables/Customer';
import SalesInvoice from './modules/invoicing/receivables/SalesInvoice';
import CreditNote from './modules/invoicing/receivables/CreditNote';
import AccountsReceivable from './modules/invoicing/receivables/AccountsReceivable';
// Invoicing Payables
import InvSupplier from './modules/invoicing/payables/Supplier';
import PurchaseInvoice from './modules/invoicing/payables/PurchaseInvoice';
import DebitNote from './modules/invoicing/payables/DebitNote';
import AccountsPayable from './modules/invoicing/payables/AccountsPayable';
// Invoicing Payments
import InvPaymentEntry from './modules/invoicing/payments/PaymentEntry';
import InvJournalEntry from './modules/invoicing/payments/JournalEntry';
import PaymentRequest from './modules/invoicing/payments/PaymentRequest';
import PaymentOrder from './modules/invoicing/payments/PaymentOrder';
import PaymentReconciliation from './modules/invoicing/payments/PaymentReconciliation';
import UnreconcilePayment from './modules/invoicing/payments/UnreconcilePayment';
import ProcessPaymentReco from './modules/invoicing/payments/ProcessPaymentReco';
import RepostAccountingLedger from './modules/invoicing/payments/RepostAccountingLedger';
import RepostPaymentLedger from './modules/invoicing/payments/RepostPaymentLedger';
// Invoicing Reports
import GeneralLedger from './modules/invoicing/reports/GeneralLedger';
import TrialBalance from './modules/invoicing/reports/TrialBalance';
import FinancialReports from './modules/invoicing/reports/FinancialReports';


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
                      
                      {/* Stock Module Routes */}
                      <Route path="stock" element={<StockDashboard />} />
                      <Route path="stock/dashboard" element={<StockDashboard />} />
                      <Route path="stock/stock-entry" element={<StockEntry />} />
                      <Route path="stock/purchase-receipt" element={<PurchaseReceipt />} />
                      <Route path="stock/delivery-note" element={<DeliveryNote />} />
                      <Route path="stock/material-request" element={<MaterialRequest />} />
                      <Route path="stock/pick-list" element={<PickList />} />

                      <Route path="stock/tools/serial-no" element={<SerialNo />} />
                      <Route path="stock/tools/batch" element={<Batch />} />
                      <Route path="stock/tools/quality" element={<QualityInspection />} />

                      <Route path="stock/setup/warehouse" element={<Warehouse />} />
                      <Route path="stock/setup/item" element={<Item />} />
                      <Route path="stock/setup/item-group" element={<ItemGroup />} />
                      <Route path="stock/setup/uom" element={<UnitOfMeasure />} />

                      <Route path="stock/reports/stock-ledger" element={<StockLedger />} />
                      <Route path="stock/reports/stock-balance" element={<StockBalance />} />
                      <Route path="stock/reports/warehouse-wise-stock" element={<WarehouseWiseStock />} />
                      <Route path="stock/reports/item-prices" element={<ItemPrices />} />

                      <Route path="stock/settings" element={<StockSettings />} />
                      <Route path="stock/getting-started" element={<StockGettingStarted />} />
                      
                      {/* Payments Module Routes */}
                      <Route path="payments" element={<PaymentsDashboard />} />
                      <Route path="payments/dashboard" element={<PaymentsDashboard />} />
                      <Route path="payments/payment-entry" element={<PaymentsPaymentEntry />} />
                      <Route path="payments/journal-entry" element={<PaymentsJournalEntry />} />
                      <Route path="payments/payment-request" element={<PaymentsPaymentRequest />} />
                      <Route path="payments/payment-order" element={<PaymentsPaymentOrder />} />
                      <Route path="payments/payment-reconciliation" element={<PaymentsPaymentReconciliation />} />
                      <Route path="payments/unreconcile-payment" element={<PaymentsUnreconcilePayment />} />
                      <Route path="payments/process-payment-reco" element={<PaymentsProcessPaymentReco />} />
                      <Route path="payments/repost-accounting-ledger" element={<PaymentsRepostAccountingLedger />} />
                      <Route path="payments/repost-payment-ledger" element={<PaymentsRepostPaymentLedger />} />

                      {/* Invoicing Module Routes */}
                      <Route path="invoicing" element={<InvoicingDashboard />} />
                      <Route path="invoicing/dashboard" element={<InvoicingDashboard />} />
                      <Route path="invoicing/chart-of-accounts" element={<ChartOfAccounts />} />

                      <Route path="invoicing/receivables/customer" element={<InvCustomer />} />
                      <Route path="invoicing/receivables/sales-invoice" element={<SalesInvoice />} />
                      <Route path="invoicing/receivables/credit-note" element={<CreditNote />} />
                      <Route path="invoicing/receivables/accounts-receivable" element={<AccountsReceivable />} />

                      <Route path="invoicing/payables/supplier" element={<InvSupplier />} />
                      <Route path="invoicing/payables/purchase-invoice" element={<PurchaseInvoice />} />
                      <Route path="invoicing/payables/debit-note" element={<DebitNote />} />
                      <Route path="invoicing/payables/accounts-payable" element={<AccountsPayable />} />

                      <Route path="invoicing/payments/payment-entry" element={<InvPaymentEntry />} />
                      <Route path="invoicing/payments/journal-entry" element={<InvJournalEntry />} />
                      <Route path="invoicing/payments/payment-request" element={<PaymentRequest />} />
                      <Route path="invoicing/payments/payment-order" element={<PaymentOrder />} />
                      <Route path="invoicing/payments/payment-reconciliation" element={<PaymentReconciliation />} />
                      <Route path="invoicing/payments/unreconcile-payment" element={<UnreconcilePayment />} />
                      <Route path="invoicing/payments/process-payment-reco" element={<ProcessPaymentReco />} />
                      <Route path="invoicing/payments/repost-accounting-ledger" element={<RepostAccountingLedger />} />
                      <Route path="invoicing/payments/repost-payment-ledger" element={<RepostPaymentLedger />} />

                      <Route path="invoicing/reports/general-ledger" element={<GeneralLedger />} />
                      <Route path="invoicing/reports/trial-balance" element={<TrialBalance />} />
                      <Route path="invoicing/reports/financial-reports" element={<FinancialReports />} />

                      <Route path="invoicing/settings" element={<InvoicingSettings />} />
                      <Route path="invoicing/getting-started" element={<InvoicingGettingStarted />} />

                      
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
