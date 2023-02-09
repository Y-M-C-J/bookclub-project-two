// Import the express Router
const router = require('express').Router();

// Import the User model
const { User } = require('../../models');

// Route for creating a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user in the database using the data from the request body
    const userData = await User.create(req.body);

    // Save the user's data in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Return the created user's data to the client
      res.status(200).json(userData);
    });
  } catch (err) {
    // Return an error if there was a problem creating the user
    res.status(400).json(err);
  }
});

// Route for logging in a user
router.post('/login', async (req, res) => {
  try {
    // Find the user in the database using the email from the request body
    const userData = await User.findOne({ where: { email: req.body.email } });

    // Return an error if the user was not found
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the password is correct
    const validPassword = await userData.checkPassword(req.body.password);

    // Return an error if the password is incorrect
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save the user's data in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Return a success message and the user's data to the client
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    // Return an error if there was a problem logging in the user
    res.status(400).json(err);
  }
});

// Route for logging out a user
router.post('/logout', (req, res) => {
  // If the user is logged in, destroy their session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // Return a success status to the client
      res.status(204).end();
    });
  } else {
    // Return an error if the user was not logged in
    res.status(404).end();
  }
});

// Export the router for use in other parts of the application
module.exports = router;
