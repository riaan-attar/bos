/**
 * Models Index
 * Initializes all Sequelize models and defines their relationships.
 * Add new models to this file to ensure they are loaded.
 */
const sequelize = require('../config/db');

// Import models
// const User = require('./User.model');
// const Lead = require('./Lead.model');

// Define associations here
// User.hasMany(Lead);
// Lead.belongsTo(User);

module.exports = {
  sequelize,
  // User,
  // Lead
};
