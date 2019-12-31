/**
 * Route configuration
 */

'use strict';

const bankRouter = require('./bank_router');
const loginRouter = require('./login_router');
const branchListRouter = require('./branch_list_router');


module.exports = function (app) {
  app.use('/bank', bankRouter);
  app.use('/login', loginRouter);
  app.use('/branches', branchListRouter);
};
