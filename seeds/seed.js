const sequelize = require('../config/connection');
const { User, Book } = require('../models');

// Require the user data and book data JSON files
const userData = require('./userData.json');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  // Synchronize the database with the defined models and force a reset of the database
  await sequelize.sync({ force: true });

  // Use the bulkCreate method to create multiple users with the userData JSON file
  const users = await User.bulkCreate(userData, {
    individualHooks: true, // run beforeCreate, afterCreate, beforeSave, afterSave, etc. hooks for each record
    returning: true, // return the created records
  });

  // Loop through each book in the bookData JSON file and create a new book instance
  for (const book of bookData) {
    // Create the book with a random user_id from the created users
    const user = users[Math.floor(Math.random() * users.length)]
    const bookData = await Book.create({
      ...book,
      user_id: user.id,
    });
    // Add a relationship between the first user and the created book with a through option
    await bookData.addUser(user, { through: { selfGranted: false } });
  }

  // Exit the process when done
  process.exit(0);
};

// Call the seedDatabase function to seed the database with the data from the JSON files
seedDatabase();

