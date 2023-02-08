const User = require('./User');
const Book = require('./Book');
const Comment = require('./Comment');

Book.belongsToMany(User, {
  through: 'user_book',
  foreignKey: 'book_id',
});

User.belongsToMany(Book, {
  through: 'user_book',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Book.hasMany(Comment, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Book, Comment };
