// newFormHandler function to handle form submissions for creating new books
const newFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Collect the values from the form inputs
  const name = document.querySelector('#book-name').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const description = document.querySelector('#book-desc').value.trim();

  // Check if all required fields are filled out
  if (name && author && description) {
    // Send a POST request to the API endpoint to create a new book
    const response = await fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify({ name, author, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      // If not successful, display an error message
      alert('Failed to add book');
    }
  }
};

// delButtonHandler function to handle clicks on delete buttons
const delButtonHandler = async (event) => {
  // Check if the target element has a data-id attribute
  if (event.target.hasAttribute('data-id')) {
    // Collect the id from the data-id attribute
    const id = event.target.getAttribute('data-id');

    // Send a DELETE request to the API endpoint to delete the book
    const response = await fetch(`/api/books/${id}`, {
      method: 'DELETE',
    });

    // Check if the request was successful
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      // If not successful, display an error message
      alert('Failed to delete book');
    }
  }
};

// Attach the newFormHandler function to the submit event of the new book form
document
  .querySelector('.new-book-form')
  .addEventListener('submit', newFormHandler);

// Attach the delButtonHandler function to the click event of the book list
document
  .querySelector('.book-list')
  .addEventListener('click', delButtonHandler);
