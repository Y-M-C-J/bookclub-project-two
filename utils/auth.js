const withAuth = (req, res, next) => {
  // Check if the user is logged in
  if (!req.session.logged_in) {
    // If the user is not logged in, redirect the request to the login route
    res.redirect('/login');
  } else {
    // If the user is logged in, proceed with the request
    next();
  }
};

// Export the `withAuth` function
module.exports = withAuth;
