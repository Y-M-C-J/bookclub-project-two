const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define the User model
class User extends Model {
  // Method to check if a given password matches the password stored in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with the necessary attributes
User.init(
  {
    // ID attribute
    id: {
      type: DataTypes.INTEGER, // Datatype is an integer
      allowNull: false, // Cannot be null
      primaryKey: true, // This is the primary key for this table
      autoIncrement: true, // This value is automatically incremented
    },
    // Name attribute
    name: {
      type: DataTypes.STRING, // Datatype is a string
      allowNull: false, // Cannot be null
    },
    // Email attribute
    email: {
      type: DataTypes.STRING, // Datatype is a string
      allowNull: false, // Cannot be null
      unique: true, // Must be unique
      validate: {
        isEmail: true, // Must be a valid email address
      },
    },
    // Password attribute
    password: {
      type: DataTypes.STRING, // Datatype is a string
      allowNull: false, // Cannot be null
      validate: {
        len: [8], // Must be at least 8 characters long
      },
    },
  },
  {
    // Hooks to hash the password before creating or updating a user
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize, // The database connection instance
    timestamps: false, // Timestamps are not used
    freezeTableName: true, // Freeze the table name
    underscored: true, // Use underscore naming conventions
    modelName: 'user', // Name of the model
  }
);

// Export the User model
module.exports = User;
