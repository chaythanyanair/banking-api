'use strict';

const { Validator } = require('./validator');
const errors = require('../utils/errors');
const Constants = require('../utils/constants');
class GetBankRequestValidator extends Validator {
  constructor() {
    super();
    this.errorType = null;
  }

  _validateRequest() {
    this.setPayload(this.request.query);
    if (!this.validate(Constants.Params.BANK_NAME)) {
      this.errorType = errors.CUSTOM_ERR.bankNameMissing;
      return (!this.hasErrors());
    }
    if (!this.validate(Constants.Params.CITY)) {
      this.errorType = errors.CUSTOM_ERR.cityMissing;
      return (!this.hasErrors());
    }

    if (this.has(Constants.Params.OFFSET)) {
      this.isInt(this.get(Constants.Params.OFFSET));
    }
    if (this.has(Constants.Params.LIMIT)) {
      this.isInt(this.get(Constants.Params.LIMIT));
    }
    return (!this.hasErrors());
  }
}

module.exports = GetBankRequestValidator;
