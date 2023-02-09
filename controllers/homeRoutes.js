const router = require('express').Router();
const { Book, User } = require('../models');
const withAuth = require('../utils/auth');

// Define the home page route
router.get('/', async (req, res) => {
  try {
    // Fetch all books from the database and join with user data
    // to retrieve the user's name for each book
    const bookData = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize the data to make it easier for the template engine to read
    const books = bookData.map((book) => book.get({ plain: true }));

    // Pass the serialized data and the session flag to the template engine
    res.render('homepage', {
      books,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If an error occurs, return a 500 error with the error message
    res.status(500).json(err);
  }
});

// Define the route for displaying individual books
router.get('/book/:id', async (req, res) => {
  try {
    // Fetch the requested book from the database and join with user data
    // to retrieve the user's name for the book
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize the data to make it easier for the template engine to read
    const book = bookData.get({ plain: true });

    // Pass the serialized data and the session flag to the template engine
    res.render('book', {
      ...book,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    // If an error occurs, return a 500 error
    res.status(500).json(err);
  }
});

// Define the login page route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the user with the matching session ID
    const userData = await User.findByPk(req.session.user_id, {
      // Exclude the password field from the returned data
      attributes: { exclude: ['password'] },
      // Include related Book data
      include: [{ model: Book }],
    });

    // Convert the Sequelize model instance to a plain object
    const user = userData.get({ plain: true });

    // Render the profile view and pass along the user data and the logged in status
    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    // Return a 500 error if there's an issue retrieving the user data
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // Check if the user is already logged in by checking the session flag
  if (req.session.logged_in) {
    // If the user is already logged in, redirect the request to the profile page
    res.redirect('/profile');
    return;
  }

  // If the user is not logged in, render the login page
  res.render('login');
});

// Export the router so it can be used in other parts of the application
module.exports = router;
