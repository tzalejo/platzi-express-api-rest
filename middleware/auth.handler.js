const boom = require('@hapi/boom');
const {config} = require('../config/config');

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  }
  next(boom.unauthorized());
};

const checkRole = (...roles) => {
  return (req, res, next)=> {
    const user = req.user;
    if(roles.includes(user.role)){
      next();
    }
    next(boom.unauthorized());
  }
};
module.exports = {checkApiKey, checkRole};
