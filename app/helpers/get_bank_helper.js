'use strict';
const pgPool = require('../../config/data_source');
const logger = require('../utils/logger');

class GetBankHelper {
  constructor() { }

  formatResult(resultData, rowCount) {
    let bank = {};
    if (resultData.length <= 0) {
      return {
        code: 200,
        status: 'Success',
        bank: 'No data found'
      };
    }
    resultData.forEach(row => {
      bank = {
        id: row.id,
        name: row.bank_name,
        ifsc_code: row.ifsc,
        branch: row.branch,
        address: row.address,
        city: row.city,
        district: row.district,
        state: row.state
      };
    });

    return {
      code: 200,
      status: 'Success',
      bank: bank
    };
  }

  async getBankFromDb(requestData) {
    logger.info('getBankFromDb ', requestData);
    let result;
    let query = `select banks.id, banks.name as bank_name, ifsc, branch,
    address, city, district, state from banks inner join branches t
    on banks.id = t.bank_id and t.ifsc = '${requestData.ifscCode}'`;
    try {
      result = await pgPool.dbClient.query(query);
    } catch (error) {
      logger.error('ERROR fetching bank details', error);
      return new Error();
    }
    let resultJson = this.formatResult(result.rows);
    return resultJson;
  }
}

module.exports = new GetBankHelper();
