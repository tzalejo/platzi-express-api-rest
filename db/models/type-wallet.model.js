const { Model, DataTypes, Sequelize } = require('sequelize');

// define la tabla
const TYPE_WALLET_TABLE = 'type_wallets';

const TypeWalletSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: { allowNull: false, type: DataTypes.STRING, unique: false },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class TypeWallet extends Model {
  static associate(models) {
    this.hasMany(models.Wallet, {
      as: 'wallets',
      foreignKey: 'typeWalletId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TYPE_WALLET_TABLE,
      modelName: 'TypeWallet',
      timestamps: false,
    };
  }
}

module.exports = { TYPE_WALLET_TABLE, TypeWalletSchema, TypeWallet };
