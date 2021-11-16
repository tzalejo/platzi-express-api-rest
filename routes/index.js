const express = require('express');
const users = require('./users');
const wallets = require('./wallets');
const typewallets = require('./typewallets');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', users);
  router.use('/wallets', wallets);
  router.use('/type/wallets', typewallets);
}

module.exports = routerApi;
