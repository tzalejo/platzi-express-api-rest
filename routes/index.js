const express = require('express');
const users = require('./users');
const wallets = require('./wallets');
const typeWallets = require('./type-wallets');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', users);
  router.use('/wallets', wallets);
  router.use('/type-wallets', typeWallets);
}

module.exports = routerApi;
