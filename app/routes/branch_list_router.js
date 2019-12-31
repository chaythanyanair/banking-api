'use strict';

const GetBranchesController = require('../controllers/get_branches_controller');
const build = require('../utils/controller-factory');
const router = require('express').Router({ mergeParams: true });
const tokenValidator = require('../validators/request_token_validator');

router.get('/', tokenValidator.validateToken, build(GetBranchesController.getBranches.bind(GetBranchesController))
);

module.exports = router;
