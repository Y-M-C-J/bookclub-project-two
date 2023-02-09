const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model
class Comment extends Model {}

// Initialize the Comment model with columns and options
Comment.init(
  {
    // Define the id column
    id: {
      type: DataTypes.INTEGER, // The data type is integer
      allowNull: false, // The value cannot be null
      primaryKey: true, // This is the primary key
      autoIncrement: true, // The value should be auto incremented
    },
    // Define the title column
    title: {
      type: DataTypes.STRING, // The data type is string
      allowNull: false, // The value cannot be null
    },
    // Define the body column
    body: {
      type: DataTypes.STRING, // The data type is string
      allowNull: true, // The value can be null
    },
    // Define the user_id column
    user_id: {
      type: DataTypes.INTEGER, // The data type is integer
      references: {
        model: 'user', // This column references the id column of the user model
        key: 'id', // The referenced column is the id column
      },
    },
    // Define the book_id column
    book_id: {
      type: DataTypes.INTEGER, // The data type is integer
      references: {
        model: 'book', // This column references the id column of the book model
        key: 'id', // The referenced column is the id column
      },
    },
  },
  {
    sequelize, // Connect the model to the sequelize instance
    freezeTableName: true, // Don't change the table name
    underscored: true, // Use underscores in the table name and column names
    modelName: 'comment', // Name the model 'comment'
  }
);

// Export the Comment model
module.exports = Comment;
