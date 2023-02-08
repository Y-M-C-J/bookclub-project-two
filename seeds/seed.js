const sequelize = require('../config/connection');
const { User, Book } = require('../models');

const userData = require('./userData.json');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const book of bookData) {
    const bookData = await Book.create({
      ...book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    await bookData.addUser(users[0], { through: { selfGranted: false } });
  }

  process.exit(0);
};

seedDatabase();
