// Import the Sequelize library
const Sequelize = require('sequelize');

// Load the environment variables from the .env file
require('dotenv').config();

// Create a new Sequelize instance, either by using the JAWSDB_URL environment variable or by passing
// separate values for the database name, username, and password
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
      }
    );

// Export the sequelize instance for use in other parts of the application
module.exports = sequelize;
