'use strict';
const pgPool = require('../../config/data_source');
const logger = require('../utils/logger');

class GetBranchesHelper {
  constructor() { }

  formatResult(resultData, rowCount) {
    const list = [];
    if (resultData.length <= 0) {
      return {
        code: 200,
        status: 'Success',
        banks: 'No data found'
      };
    }
    resultData.forEach(row => {
      list.push({
        id: row.bank_id,
        name: row.bank_name,
        ifsc_code: row.ifsc,
        branch: row.branch,
        address: row.address,
        city: row.city,
        district: row.district,
        state: row.state
      });
    });

    return {
      code: 200,
      status: 'Success',
      count: rowCount ? rowCount : 0,
      banks: list
    };
  }

  async getBranchesFromDb(requestData) {
    logger.info('getBranchListFromDb ', requestData);
    let result;
    let queryString = `select
	bank_id, ifsc, branch, address, city, district, state,
	t.name as bank_name from branches inner join banks t on
	bank_id = t.id where t.name = '${requestData.bankName}'
  and city = '${requestData.city}'
  limit ${requestData.limit} offset ${requestData.offset}`;

    try {
      result = await pgPool.dbClient.query(queryString);
    } catch (error) {
      logger.error('ERROR fetching branch list', error);
      return new Error();
    }
    let resultJson = this.formatResult(result.rows, result.rowCount);

    return resultJson;
  }
}

module.exports = new GetBranchesHelper();

