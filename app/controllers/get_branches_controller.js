'use strict';

const GetBranchesHelper = require('../helpers/get_branches_helper');
const Controller = require('./controller')
const GetBranchesRequestValidator = require('../validators/get_branches_request_validator');
const errors = require('../utils/errors');

class GetBankController extends Controller {
  constructor() {
    super();
  }

  async getBranches(req, res) {
    this.request = req;
    this.response = res;

    let requestParams = {
      offset: req.query.offset || null,
      limit: req.query.limit || null,
      bankName: req.query.bank_name,
      city: req.query.city
    }
    this.setValidator(GetBranchesRequestValidator);

    if (!this.validator.validateRequest(this.request)) {
      if (this.validator.errorType) {
        return Promise.reject(this.validator.errorType);
      }
      return Promise.reject(errors.GENERIC_ERR.input);
    }
    try {
      let result = await GetBranchesHelper.getBranchesFromDb(requestParams);
      return result;

    } catch (err) {
      return Promise.reject(errors.GENERIC_ERR.internal);
    }
  }
}
module.exports = new GetBankController();
