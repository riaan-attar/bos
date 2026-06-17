/**
 * Server Entry Point
 * Starts the Express server and syncs the database.
 */
const app = require('./app');
const env = require('./config/env');
const sequelize = require('./config/db');
// Require models to ensure they are registered before sync
require('./models');

const startServer = async () => {
  try {
    // Authenticate and sync DB
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // In production, use migrations instead of sync()
    await sequelize.sync({ alter: true });
    console.log('Database synced.');

    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
