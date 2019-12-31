'use strict';

const { Validator } = require('./validator');
const errors = require('../utils/errors');
const Constants = require('../utils/constants');
class GetBankReuqestValidator extends Validator {
  constructor() {
    super();
  }
  _validateRequest() {
    this.setPayload(this.request.query);
    this.validate(Constants.Params.IFSC);
    return (!this.hasErrors());
  }
}

module.exports = GetBankReuqestValidator;
