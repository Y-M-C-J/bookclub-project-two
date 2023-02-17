// This function is triggered when the login form is submitted
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint with the user's email and password
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the response is successful, redirect the user to the homepage
    if (response.ok) {
      document.location.replace('/');
      return;
    }

    // If the response is not successful, show an error message using the SweetAlert library
    const data = await response.json();
    Swal.fire({
      title: 'Failed to Login!',
      html: data?.errors.map((e) => e.msg).join('<br/>'),
      icon: 'error',
    });
  }
};

// This function is triggered when the signup form is submitted
const signupFormHandler = async (event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  // Collect values from the signup form
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    // Send a POST request to the API endpoint with the user's name, email, and password
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the response is successful, redirect the user to the homepage
    if (response.ok) {
      document.location.replace('/');
      return;
    }

    // If the response is not successful, show an error message using the SweetAlert library
    const data = await response.json();
    Swal.fire({
      title: 'Failed to Signup!',
      html: data?.errors.map((e) => e.msg).join('<br/>'),
      icon: 'error',
    });
  }
};

// Attach event listeners to the login and signup forms
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
