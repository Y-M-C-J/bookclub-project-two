// Import the express Router
const router = require('express').Router();

// Import the user routes and book routes
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');

// Use the user routes and book routes in the main router
router.use('/users', userRoutes);
router.use('/books', bookRoutes);

// Export the main router for use in other parts of the application
module.exports = router;
