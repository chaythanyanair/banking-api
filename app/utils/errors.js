/**
 * Application-wide error codes and messages
 */

'use strict';

module.exports = {

  // Generic errors
  GENERIC_ERR: {
    invalidAccessToken: {
      code: 100,
      httpCode: 403,
      httpResponse: 'Invalid Access Token',
      safe: true,
    },
    accessTokenMissing: {
      code: 101,
      httpCode: 403,
      httpResponse: 'Access Token Missing',
      safe: true,
    },
    internal: {
      code: 1001,
      httpCode: 500,
      httpResponse: 'Internal error',
      safe: true,
    },
    input: {
      code: 1002,
      httpCode: 400,
      httpResponse: 'Parameter mismatch',
      safe: true,
    },
    id: {
      code: 1003,
      httpCode: 400,
      httpResponse: 'Invalid Id',
      safe: true,
    },
    notFound: {
      code: 1004,
      httpCode: 404,
      httpResponse: 'Resource not found',
      safe: true,
    },
    userRole: {
      code: 1005,
      httpCode: 400,
      httpResponse: 'Invalid user',
      safe: true,
    },
  },
  // Custom errors
  CUSTOM_ERR: {
    ifscMissing: {
      code: 1006,
      httpCode: 400,
      httpResponse: 'Missing Parameter IFSC code',
      safe: true
    },
    userNameOrPasswordMissing: {
      code: 1007,
      httpCode: 400,
      httpResponse: 'Missing username or password',
      safe: true
    },
    userNameOrPasswordIncorrect: {
      code: 1007,
      httpCode: 400,
      httpResponse: 'Incorrect username or password',
      safe: true
    },
    bankNameMissing: {
      code: 1008,
      httpCode: 400,
      httpResponse: 'Bank name is missing',
      safe: true
    },
    cityMissing: {
      code: 1007,
      httpCode: 400,
      httpResponse: 'City is missing',
      safe: true
    }
  },
  ERROR_CODES: {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERR: 500,
    FORBIDDEN: 403,
  },
};

