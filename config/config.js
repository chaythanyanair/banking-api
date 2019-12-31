'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const glob = require('glob');
const chalk = require('chalk');
const logger = require('../app/utils/logger');

// Always use development environment
process.env.NODE_ENV = 'development';
const environmentFiles = glob('./config/env/' + process.env.NODE_ENV + '.js', {
  sync: true,
});

if (!environmentFiles.length) {
  if (process.env.NODE_ENV) {
    logger.error(chalk.red(`No configuration file found for "${process.env.NODE_ENV}"` +
      ' environment, using default development environment'));
  } else {
    logger.error(chalk.red(
      'NODE_ENV is not defined! Using default development environment'
    ));
  }

  process.env.NODE_ENV = 'development';
} else {
  logger.info(chalk.black.bgWhite(`Application loaded using the "${process.env.NODE_ENV}"` +
    ' environment configuration'));
}


// Export application configurations
module.exports = _.extend(
  require('./env/base'),
  require('./env/' + process.env.NODE_ENV) || {}
);

