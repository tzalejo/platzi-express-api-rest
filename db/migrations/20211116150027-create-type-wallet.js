'use strict';
const { TypeWalletSchema, TYPE_WALLET_TABLE } = require('../models/typewallet.model');
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(TYPE_WALLET_TABLE, TypeWalletSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(TYPE_WALLET_TABLE);
  }
};
