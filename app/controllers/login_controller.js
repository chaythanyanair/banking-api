const Constants = require('../utils/constants');
const jwt = require('jsonwebtoken');
const errors = require('../utils/errors')
const config = require('../../config/config');

class LoginController {

  async login (req) {
    let username = req.body.username;
    let password = req.body.password;
    let mockedUsername = Constants.Development.USERNAME;
    let mockedPassword = Constants.Development.PASSWORD;
    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '5d' // expires in 5 days
          }
        );
        // return the JWT token for the future API calls
        const responseJSON = {
          status: 'Success',
          access_token: token
        }
        return responseJSON;
      } else {
        return Promise.reject(errors.CUSTOM_ERR.userNameOrPasswordIncorrect);
      }
    } else {
      return Promise.reject(errors.CUSTOM_ERR.userNameOrPassword);
    }
  }
}


module.exports = new LoginController();
