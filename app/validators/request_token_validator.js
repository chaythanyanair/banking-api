let jwt = require('jsonwebtoken');
const config = require('../../config/config');
const errors = require('../utils/errors');

let validateToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(403).send(errors.GENERIC_ERR.invalidAccessToken);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send(errors.GENERIC_ERR.accessTokenMissing);
  }
};

module.exports = {
  validateToken: validateToken
}
