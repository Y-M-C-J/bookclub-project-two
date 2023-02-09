// Import the express Router class
const router = require('express').Router();

// Import the API routes
const apiRoutes = require('./api');

// Import the home routes
const homeRoutes = require('./homeRoutes');

// Use the home routes for requests that start with "/"
router.use('/', homeRoutes);

// Use the API routes for requests that start with "/api"
router.use('/api', apiRoutes);

// Export the router so it can be used in other parts of the application
module.exports = router;
