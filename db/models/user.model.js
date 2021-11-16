const {Model, DataTypes, Sequelize} = require('sequelize');

// definir la tabla
const USER_TABLE = 'users';

// defini la estructura de la bd
const UserSchema  = {
  id: {allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
  name: {allowNull: false, type: DataTypes.STRING, unique: false},
  email: {allowNull: false, type: DataTypes.STRING, unique: true},
  password: {allowNull:false, type: DataTypes.STRING},
  createdAt: {allowNull: false, type: DataTypes.DATE, field: 'create_at', defaultValue: Sequelize.NOW}
}

class User extends Model{
  static associate(){
    //
  }

  static config(sequelize){
    return {sequelize, tableName: USER_TABLE, modelName: 'User', timestamps: false}
  }
}

module.exports = {USER_TABLE, UserSchema, User};
