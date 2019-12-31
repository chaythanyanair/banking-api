'use strict';

class Validator {
  constructor() {
    this.request = null;
    this.payload = null;
    this.errors = null;
    this.missing = null;
  }

  set obj(payload) {
    this.setPayload(payload);
  }

  setPayload(obj) {
    this.payload = obj;
  }

  get obj() {
    return this.payload;
  }

  has(name) {
    return typeof this.get(name) != 'undefined';
  }

  get(name) {
    return this.payload[name];
  }

  isInt(value) {
    if (isNaN(value)) {
      this.errors = true;
      return false;
    }
    const x = parseInt(value);

    this.errors = !(x == value);
    return x == value;
  }

  validateRequest(request) {
    this.request = request;
    return this._validateRequest();
  }

  validate(name) {
    let parameterIsMissing = false;
    if (!this.has(name)) {

      parameterIsMissing = true;
      this.missing = true;
    }
    return parameterIsMissing ? false : true;
  }

  hasErrors() {
    return this.missing || this.errors;
  }

  validateJWTTokenRequest(request) {
    try {
      if (!this._validateJWTToken(request.params)) {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

}
module.exports = {
  Validator,
};
