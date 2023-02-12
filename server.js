// Require the `dotenv` package to access environment variables from .env file
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// Import the controllers that handle the application routes
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Connect to the database using the `sequelize` module
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an instance of the Express.js application
const app = express();
// Get the port number from the environment variables, or use 3001 as default
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Create the session object with configuration options
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: true, // Don't save the session if it's not modified
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use the session middleware to track the user session
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use the `express.json()` middleware to parse JSON requests
app.use(express.json());
// Use the `express.urlencoded` middleware to parse URL-encoded data in requests
app.use(express.urlencoded({ extended: true }));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount the controllers that handle the application routes
app.use(routes);

// Synchronize the database models with the database and start the Express.js app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
