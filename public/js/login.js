const loginFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both email and password are not empty
  if (email && password) {
    // Send a POST request to the API endpoint for user login
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the response from the server was successful
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      // Show an error message if the response from the server was not successful
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Collect values from the sign up form
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if name, email and password are not empty
  if (name && email && password) {
    // Send a POST request to the API endpoint for user sign up
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the response from the server was successful
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      // Show an error message if the response from the server was not successful
      alert(response.statusText);
    }
  }
};

// Attach the `loginFormHandler` function to the login form's submit event
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Attach the `signupFormHandler` function to the sign up form's submit event
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
