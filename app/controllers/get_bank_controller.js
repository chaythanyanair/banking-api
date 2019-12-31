'use strict';

const GetBankHelper = require('../helpers/get_bank_helper');
const Controller = require('./controller')
const GetBankRequestValidator = require('../validators/get_bank_request_validator');
const errors = require('../utils/errors');

class GetBankController extends Controller {
  constructor() {
    super();
  }

  async getBank(req, res) {
    this.request = req;
    this.response = res;
    let requestParams = {
      ifscCode: req.query.ifsc
    }
    this.setValidator(GetBankRequestValidator);

    try {
      if (!this.validator.validateRequest(this.request)) {
        return Promise.reject(errors.CUSTOM_ERR.ifscMissing);
      }
    } catch (err) {
      if (Object.keys(err).length !== 0) {
        return Promise.reject(err[Object.keys(err)[0]]);
      }
    }
    let result = await GetBankHelper.getBankFromDb(requestParams);
    if (result instanceof Error) {
      return Promise.reject(errors.GENERIC_ERR.internal);
    }
    return result;

  }
}
module.exports = new GetBankController();
