const expressJwt = require('express-jwt');
const config = require('../config.json');
const UserService = require('../Users/User.service');

const jwt = () => {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      '/user/login',
      '/user/create'
    ]
  });
}

const isRevoked = async (req, payload, done) => {
  const user = await UserService.getByIdToAuthenticate(payload.sub);
  if (!user) {
    return done(null, true);
  }
  done();
}
module.exports = jwt;