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

// Define associations
Lead.hasMany(Opportunity, { foreignKey: 'linkedLeadId', as: 'opportunities' });
Opportunity.belongsTo(Lead, { foreignKey: 'linkedLeadId', as: 'lead' });

// Define associations for Project module
Project.hasMany(ProjectTask, { foreignKey: 'project', sourceKey: 'projectName', as: 'tasks' });
ProjectTask.belongsTo(Project, { foreignKey: 'project', targetKey: 'projectName', as: 'projectInfo' });

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
  Timesheet
};
