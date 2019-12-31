'use strict';

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'banking-api',
  outputCapture: 'std',
});

module.exports = logger;
