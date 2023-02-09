// Logout function to send a POST request to the logout API endpoint
const logout = async () => {
  // Make a POST request to the /api/users/logout endpoint
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // If the response is successful, redirect the browser to the home page
  if (response.ok) {
    document.location.replace('/');
  } else {
    // If the response is not successful, show an alert with the error message
    alert(response.statusText);
  }
};

// Add an event listener to the logout button to trigger the logout function
document.querySelector('#logout').addEventListener('click', logout);
