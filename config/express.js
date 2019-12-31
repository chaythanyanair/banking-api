'use strict';

/**
 * Module dependencies.
 */
const express = require('express');
const morgan = require('morgan');
const logger = require('../app/utils/logger');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const compression = require('compression');
const XError = require('x-error');
const err = require('../app/utils/errors.js');

module.exports = function (config) {
  // Initialize express app
  const app = express();
  app.use(compression({
    threshold: 0,
  }));

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'));
  }

  // Request body parsing middleware should be above methodOverride

  app.use(bodyParser.json());
  app.use(function (error, req, res, next) {
    next(new XError(err.GENERIC_ERR.input).ex(error));
  });

  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(methodOverride());

  // Use helmet to secure Express headers
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.disable('x-powered-by');

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // ELB status check
  app.get('/status.html', function (req, res) {
    res.status(200).send();
  });

  // Register routes
  require('../app/routes')(app, config);
  // Catch-all error handler
  app.use(function (error, res) {
    if (process.env.NODE_ENV === 'development') {
      logger.error(error.message);
      logger.error(error.stack);
    }

    res.status(500).json({
      code: 1000,
      msg: 'Internal error',
    });
  });

  // Assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).send();
  });

  // Return Express server instance
  return app;
};
