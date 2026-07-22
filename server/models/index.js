const sequelize = require('../config/db');

// Import models
const Lead = require('./Lead.model');
const Opportunity = require('./Opportunity.model');
const Customer = require('./Customer.model');
const Contact = require('./Contact.model');
const Campaign = require('./Campaign.model');
const Contract = require('./Contract.model');
const Communication = require('./Communication.model');
const Maintenance = require('./Maintenance.model');
const Organization = require('./Organization.model');
const Note = require('./Note.model');
const Task = require('./Task.model');
const CallLog = require('./CallLog.model');
const EmailTemplate = require('./EmailTemplate.model');
const Project = require('./Project.model');
const ProjectTask = require('./ProjectTask.model');
const Timesheet = require('./Timesheet.model');

// Stock Models
const StockEntry = require('./StockEntry.model');
const PurchaseReceipt = require('./PurchaseReceipt.model');
const DeliveryNote = require('./DeliveryNote.model');
const MaterialRequest = require('./MaterialRequest.model');
const PickList = require('./PickList.model');
const Warehouse = require('./Warehouse.model');
const Item = require('./Item.model');
const ItemGroup = require('./ItemGroup.model');
const UnitOfMeasure = require('./UnitOfMeasure.model');
const SerialNo = require('./SerialNo.model');
const Batch = require('./Batch.model');
const QualityInspection = require('./QualityInspection.model');

// Invoicing Models
const InvAccount = require('./InvAccount.model');
const InvCustomer = require('./InvCustomer.model');
const InvSupplier = require('./InvSupplier.model');
const SalesInvoice = require('./SalesInvoice.model');
const SalesInvoiceItem = require('./SalesInvoiceItem.model');
const PurchaseInvoice = require('./PurchaseInvoice.model');
const PurchaseInvoiceItem = require('./PurchaseInvoiceItem.model');
const CreditNote = require('./CreditNote.model');
const DebitNote = require('./DebitNote.model');
const JournalEntry = require('./JournalEntry.model');
const JournalEntryAccount = require('./JournalEntryAccount.model');

// Payment Models
const PaymentEntry = require('./PaymentEntry.model');
const PaymentRequest = require('./PaymentRequest.model');
const PaymentOrder = require('./PaymentOrder.model');
const UnreconcilePayment = require('./UnreconcilePayment.model');
const ProcessPaymentReco = require('./ProcessPaymentReco.model');
const RepostAccountingLedger = require('./RepostAccountingLedger.model');
const RepostPaymentLedger = require('./RepostPaymentLedger.model');


// Define associations — CRM
Lead.hasMany(Opportunity, { foreignKey: 'linkedLeadId', as: 'opportunities' });
Opportunity.belongsTo(Lead, { foreignKey: 'linkedLeadId', as: 'lead' });

// Define associations for Project module
Project.hasMany(ProjectTask, { foreignKey: 'project', sourceKey: 'projectName', as: 'tasks' });
ProjectTask.belongsTo(Project, { foreignKey: 'project', targetKey: 'projectName', as: 'projectInfo' });

// Invoicing associations — Sales
InvCustomer.hasMany(SalesInvoice, { foreignKey: 'customerId' });
SalesInvoice.belongsTo(InvCustomer, { foreignKey: 'customerId' });

SalesInvoice.hasMany(SalesInvoiceItem, { foreignKey: 'salesInvoiceId', onDelete: 'CASCADE' });
SalesInvoiceItem.belongsTo(SalesInvoice, { foreignKey: 'salesInvoiceId' });

// Invoicing associations — Purchase
InvSupplier.hasMany(PurchaseInvoice, { foreignKey: 'supplierId' });
PurchaseInvoice.belongsTo(InvSupplier, { foreignKey: 'supplierId' });

PurchaseInvoice.hasMany(PurchaseInvoiceItem, { foreignKey: 'purchaseInvoiceId', onDelete: 'CASCADE' });
PurchaseInvoiceItem.belongsTo(PurchaseInvoice, { foreignKey: 'purchaseInvoiceId' });

// Invoicing associations — Notes
InvCustomer.hasMany(CreditNote, { foreignKey: 'customerId' });
CreditNote.belongsTo(InvCustomer, { foreignKey: 'customerId' });

InvSupplier.hasMany(DebitNote, { foreignKey: 'supplierId' });
DebitNote.belongsTo(InvSupplier, { foreignKey: 'supplierId' });

// Invoicing associations — Journal
JournalEntry.hasMany(JournalEntryAccount, { foreignKey: 'journalEntryId', onDelete: 'CASCADE' });
JournalEntryAccount.belongsTo(JournalEntry, { foreignKey: 'journalEntryId' });

// Payments associations
UnreconcilePayment.belongsTo(PaymentEntry, { foreignKey: 'paymentEntryId' });
PaymentEntry.hasMany(UnreconcilePayment, { foreignKey: 'paymentEntryId' });


module.exports = {
  sequelize,
  Lead,
  Opportunity,
  Customer,
  Contact,
  Campaign,
  Contract,
  Communication,
  Maintenance,
  Organization,
  Note,
  Task,
  CallLog,
  EmailTemplate,
  Project,
  ProjectTask,
  Timesheet,
  StockEntry,
  PurchaseReceipt,
  DeliveryNote,
  MaterialRequest,
  PickList,
  Warehouse,
  Item,
  ItemGroup,
  UnitOfMeasure,
  SerialNo,
  Batch,
  QualityInspection,
  // Invoicing
  InvAccount,
  InvCustomer,
  InvSupplier,
  SalesInvoice,
  SalesInvoiceItem,
  PurchaseInvoice,
  PurchaseInvoiceItem,
  CreditNote,
  DebitNote,
  JournalEntry,
  JournalEntryAccount,
  // Payments
  PaymentEntry,
  PaymentRequest,
  PaymentOrder,
  UnreconcilePayment,
  ProcessPaymentReco,
  RepostAccountingLedger,
  RepostPaymentLedger,
};
