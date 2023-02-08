// Importing the necessary models
const User = require('./User');
const Book = require('./Book');
const Comment = require('./Comment');

// Defining many-to-many relationship between Book and User models
// through the 'user_book' join table
// The foreignKey 'book_id' references the id of the book
Book.belongsToMany(User, {
  through: 'user_book',
  foreignKey: 'book_id',
});

// Defining many-to-many relationship between User and Book models
// through the 'user_book' join table
// The foreignKey 'user_id' references the id of the user
// On delete, the related records in the 'user_book' join table will be cascaded
User.belongsToMany(Book, {
  through: 'user_book',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Defining one-to-many relationship between Book and Comment models
// The foreignKey 'book_id' references the id of the book
// On delete, the related comments will be cascaded
Book.hasMany(Comment, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE',
});

// Defining the one-to-many relationship between User and Comment models
// The foreignKey 'user_id' references the id of the user
// On delete, the related comments will be cascaded
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Exporting all models for use in other parts of the application
module.exports = { User, Book, Comment };

