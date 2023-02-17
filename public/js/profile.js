// This function is responsible for handling the form submission event when a user adds a new book.
const newFormHandler = async (event) => {
  event.preventDefault(); // Prevents the default behavior of form submission.

  // Extract the values of the book name, author, and description from the form.
  const name = document.querySelector('#book-name').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const description = document.querySelector('#book-desc').value.trim();

  // If all the required fields are present, make a POST request to add the book to the database.
  if (name && author && description) {
    const response = await fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify({ name, author, description }), // Pass the book data as a JSON object in the request body.
      headers: {
        'Content-Type': 'application/json', // Set the content type of the request as JSON.
      },
    });

    // If the response from the server is OK, redirect the user to their profile page.
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to add book'); // If the response is not OK, show an alert to the user indicating failure.
    }
  }
};

// This function is responsible for handling the button click event when a user deletes a book.
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id'); // Get the ID of the book to be deleted from the button data attribute.

    const response = await fetch(`/api/books/${id}`, {
      method: 'DELETE', // Make a DELETE request to remove the book from the database.
    });

    // If the response from the server is OK, redirect the user to their profile page.
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete book'); // If the response is not OK, show an alert to the user indicating failure.
    }
  }
};

// Attach the newFormHandler function to the form submit event listener.
document
  .querySelector('.new-book-form')
  .addEventListener('submit', newFormHandler);

// Attach the delButtonHandler function to the click event listener for the book list.
document
  .querySelector('.book-list')
  .addEventListener('click', delButtonHandler);
