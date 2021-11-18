const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { TYPE_WALLET_TABLE } = require('./type-wallet.model');
// define la tabla
const WALLET_TABLE = 'wallets';

// define la destructure de la bd
const WalletSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  loginName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'login_name',
    unique: false,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },

  typeWalletId: {
    field: 'type_wallet_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: TYPE_WALLET_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Wallet extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.belongsTo(models.TypeWallet, { as: 'type_wallet' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: WALLET_TABLE,
      modelName: 'Wallet',
      timestamps: false,
    };
  }
}

module.exports = { WALLET_TABLE, WalletSchema, Wallet };
