const { User, UserSchema} = require('./user.model');
const { Wallet, WalletSchema} = require('./wallet.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Wallet.init(WalletSchema, Wallet.config(sequelize));

  Wallet.associate(sequelize.models);
}

module.exports = setupModels;
