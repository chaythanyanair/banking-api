'use strict';

module.exports = {
  dbUser: process.env.DB_USER || 'bank_admin',
  dbName: process.env.DB_NAME || 'bank',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD || 'bank_admin',
  dbPort: process.env.DB_PORT || '5432',
  secret: process.env.SECRET || 'iamasecret'
};
