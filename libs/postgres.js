const { Pool } = require('pg');
const { config } = require('./../config/config');

const pool = new Pool({ connectionString: config.dbURL});
module.exports = pool;
