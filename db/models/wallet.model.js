const { Model, DataTypes, Sequelize } = require('sequelize');

// definir la tabla
const WALLET_TABLE = 'wallets';

// defini la estructura de la bd
const WalletSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: { allowNull: false, type: DataTypes.STRING, unique: false },
  loginname: {
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
};

class Wallet extends Model {
  static associate() {
    //
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
