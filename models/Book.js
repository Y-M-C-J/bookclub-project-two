// Import the required modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Book model
class Book extends Model {}

// Initialize the Book model with the following fields
Book.init(
  {
    // ID field, unique identifier for each book
    id: {
      type: DataTypes.INTEGER, // Data type: Integer
      allowNull: false, // Not null
      primaryKey: true, // Primary key
      autoIncrement: true, // Auto incrementing
    },
    // Name field, name of the book
    name: {
      type: DataTypes.STRING, // Data type: String
      allowNull: false, // Not null
    },
    // Author field, name of the author of the book
    author: {
      type: DataTypes.STRING, // Data type: String
      allowNull: false, // Not null
    },
    // Description field, description of the book
    description: {
      type: DataTypes.STRING, // Data type: String
    },
    // Date added field, the date the book was added to the database
    date_added: {
      type: DataTypes.DATE, // Data type: Date
      allowNull: false, // Not null
      defaultValue: DataTypes.NOW, // Default value: current date and time
    },
    // User ID field, ID of the user who added the book
    user_id: {
      type: DataTypes.INTEGER, // Data type: Integer
      references: {
        model: 'user', // Reference the 'user' model
        key: 'id', // Reference the 'id' field
      },
    },
  },
  {
    sequelize, // Pass in the sequelize instance
    timestamps: false, // Do not include timestamps in the model
    freezeTableName: true, // Freeze the table name
    underscored: true, // Use snake case instead of camel case
    modelName: 'book', // Name of the model
  }
);

// Export the Book model
module.exports = Book;
