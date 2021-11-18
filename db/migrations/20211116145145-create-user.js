'use strict';

const { USER_TABLE } = require('./../models/user.model');
const {DataTypes, Sequelize} = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
      firstName: {allowNull: false, type: DataTypes.STRING, field: 'first_name', unique: false},
      lastName: {allowNull: false, type: DataTypes.STRING, field: 'last_name', unique: false},
      email: {allowNull: false, type: DataTypes.STRING, unique: true},
      birthday: {allowNull: false, type: DataTypes.DATE, unique: false},
      password: {allowNull: false, type: DataTypes.STRING},
      createdAt: {allowNull: false, type: DataTypes.DATE, field: 'create_at', defaultValue: Sequelize.NOW}
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
  },
};
