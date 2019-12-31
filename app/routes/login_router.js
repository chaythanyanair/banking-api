'use strict';

const LoginController = require('../controllers/login_controller');
const build = require('../utils/controller-factory');
const router = require('express').Router({ mergeParams: true });

router.post('/', build(LoginController.login));

module.exports = router;
