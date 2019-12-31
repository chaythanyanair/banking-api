'use strict';

const GetBankController = require('../controllers/get_bank_controller');
const build = require('../utils/controller-factory');
const router = require('express').Router({ mergeParams: true });
const tokenValidator = require('../validators/request_token_validator');

router.get('/', tokenValidator.validateToken, build(GetBankController.getBank.bind(GetBankController))
);

module.exports = router;
