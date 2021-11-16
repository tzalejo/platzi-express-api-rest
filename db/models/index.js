const { User, UserSchema} = require('./user.model');
const { Wallet, WalletSchema} = require('./wallet.model');
const { TypeWallet, TypeWalletSchema} = require('./typewallet.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Wallet.init(WalletSchema, Wallet.config(sequelize));
  TypeWallet.init(TypeWalletSchema, TypeWallet.config(sequelize));

  Wallet.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setupModels;
