require('dotenv').config();

const config ={
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbDataBase: process.env.DB_DATABASE,
  dbURL: process.env.DATABASE_URL,
}
module.exports = {config};
