/**
 * Environment Variables Loader
 * This file centralizes all env var access.
 */
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || '',
  DB_NAME: process.env.DB_NAME || 'bos_dev',
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
};
