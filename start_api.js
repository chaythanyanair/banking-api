'use strict';

/**
 * Main application entry file.
 */

const config = require('./config/config');
const dbOps = require('./config/data_source');
const logger = require('./app/utils/logger.js');

// Db connection
dbOps
  .initializeDb()
  .then(() => {
    logger.info('connected to db');
  })
  .catch((err) => {
    logger.error(err);
  });

// Init the express application
const app = require('./config/express')(config);

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log(`API Server started on port ${config.port}`);
