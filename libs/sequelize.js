const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbDataBase}`;

const sequelize = new Sequelize(URI, {dialect:'postgres', logging: false}); // logging en la consola sale las consultas x orm

setupModels(sequelize);

sequelize.sync();// crea las tablas

module.exports = sequelize;
