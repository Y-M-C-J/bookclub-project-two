// Import required modules and models
const router = require('express').Router();
const { User } = require('../../models');
const ReadList = require('../../models/ReadList');
const { check, validationResult } = require('express-validator');

// Define a route for user registration
router.post(
  '/',
  [
    // Use express-validator middleware to validate the incoming request body
    check('name', 'Name is required').notEmpty(),
    check('email')
      .isEmail()
      .withMessage('Email is not valid')
      .custom(async (email) => {
        const exist = await User.findAll({ where: { email } });
        if (exist.length) return Promise.reject();
        Promise.resolve();
      })
      .withMessage('Email already exist'),
    check('password', 'Password must contain at least 8 characters').isLength({
      min: 8,
    }),
  ],
  // Handle the registration request
  async (req, res) => {
    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new user with the data from the request body
      const userData = await User.create(req.body);

      // Save user data to the session and respond with a success message
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json(userData);
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

// Define a route for user login
router.post(
  '/login',
  [
    // Use express-validator middleware to validate the incoming request body
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password must contain at least 8 characters').isLength({
      min: 8,
    }),
  ],
  // Handle the login request
  async (req, res) => {
    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find the user with the provided email
      const userData = await User.findOne({ where: { email: req.body.email } });

      // If the user doesn't exist, respond with an error message
      if (!userData) {
        res
          .status(400)
          .json({
            errors: [{ msg: 'Incorrect email or password, please try again' }],
          });
        return;
      }

      // Check if the provided password matches the user's password hash
      const validPassword = await userData.checkPassword(req.body.password);

      // If the password is incorrect, respond with an error message
      if (!validPassword) {
        res
          .status(400)
          .json({
            errors: [{ msg: 'Incorrect email or password, please try again' }],
          });
        return;
      }

      // Save user data to the session and respond with a success message
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Define a route for adding or removing books from the user's reading list
router.post('/addToReadList', async (req, res) => {
  try {
    // Destructure the book_id from the request body to avoid repeating req.body.book_id
    const { book_id } = req.body;
    // Check if the book is already in the user's reading list
    const bookExist = await ReadList.findOne({ where: { book_id } });
    let destroyed = false;

    // If the book is already in the reading list, remove it
    if (bookExist) {
      bookExist.destroy();
      destroyed = true;
    }
    // If the book is not in the reading list, add it
    else {
      await ReadList.create({
        user_id: req.session.user_id,
        book_id,
      });
    }

    // Return the "destroyed" variable to indicate if the book was added or removed
    res.status(200).json({
      destroyed,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
