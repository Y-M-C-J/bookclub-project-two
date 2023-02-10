const Sequelize = require('sequelize');

const options = {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false
}

// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL, options)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, options);

module.exports = sequelize;