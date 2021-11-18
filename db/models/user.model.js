const {Model, DataTypes, Sequelize} = require('sequelize');

// definir la tabla
const USER_TABLE = 'users';

// defini la estructura de la bd
const UserSchema = {
  id: {allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
  firstName: {allowNull: false, type: DataTypes.STRING, field: 'first_name', unique: false},
  lastName: {allowNull: false, type: DataTypes.STRING, field: 'last_name', unique: false},
  email: {allowNull: false, type: DataTypes.STRING, unique: true},
  birthday: {allowNull: false, type: DataTypes.DATE, unique: false},
  password: {allowNull: false, type: DataTypes.STRING},
  // campo calculado
  edad: {
    type: DataTypes.VIRTUAL, get() {
      const hoy = new Date();
      const cumple = new Date(this.birthday);
      let miEdad = hoy.getFullYear() - cumple.getFullYear();
      const m = hoy.getMonth() - cumple.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
        miEdad--;
      }
      return miEdad;
    }
  },
  createdAt: {allowNull: false, type: DataTypes.DATE, field: 'create_at', defaultValue: Sequelize.NOW}
}

class User extends Model {
  static associate(models) {
    this.hasMany(models.Wallet, {
      as: 'wallets',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {sequelize, tableName: USER_TABLE, modelName: 'User', timestamps: false}
  }
}

module.exports = {USER_TABLE, UserSchema, User};
