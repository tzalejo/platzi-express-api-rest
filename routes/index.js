const express = require('express');
const users = require('./users');
const wallets = require('./wallets');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', users);
  router.use('/wallets', wallets);
}

module.exports = routerApi;
