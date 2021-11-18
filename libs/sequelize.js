const {Sequelize} = require('sequelize');

const {config} = require('./../config/config');
const setupModels = require('./../db/models');

const options = {
  dialect: 'postgres',
  logging: !config.isProd, // logging en la consola sale las consultas x orm
}
if (config.isProd) {
    options.dialectOptions = {
      ssl : {
        rejectUnauthorized: false
      }

    }
}
const sequelize = new Sequelize(config.dbURL, options);

setupModels(sequelize);

// sequelize.sync();// crea las tablas

module.exports = sequelize;
