// Function to add new book data to the list of books
const newBookData = async (event) => {
  // Prevents the default form submit behavior
  event.preventDefault();

  // Get the values of the book name, author and description fields
  const name = document.querySelector('#book-name').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  // The conditional (?.) operator is used to handle the case where the description field is not present
  const description = document.querySelector('#book-desc')?.value?.trim();

  // Only proceed if the name and author fields have values
  if (name && author /*&& description*/) {
    // Make a POST request to the "/api/books" endpoint
    const response = await fetch(`/api/books`, {
      method: 'POST',
      // Convert the name, author and description values to JSON and send them in the request body
      body: JSON.stringify({ name, author, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the response is successful (status code 200-299)
    if (response.ok) {
      // Parse the JSON data from the response
      const data = await response.json();

      // Build the HTML for the new book using the data returned from the server
      const newBook = `
      <div class="row mb-2">
        <div class="col-md-8">
          <h4><a href="/book/${data.newBook.id}">${data.newBook.name}</a></h4>
        </div>
        <div class="col-md-4">
          <button class="btn btn-sm btn-danger" data-id="${data.newBook.id}">DELETE</button>
        </div>
      </div>`;

      // Insert the HTML for the new book into the "current-books" element
      document
        .querySelector('#current-books')
        .insertAdjacentHTML('beforeend', newBook);

      // Log the "bookVolumes" data returned from the server for debugging purposes
      console.log(data.bookVolumes);
    } else {
      // If the response was not successful, show an alert with an error message
      alert('Failed to add book');
    }
  }
};

// Attach the "newBookData" function as an event listener to the "submit" event of the "new-book-form" element
document
  .querySelector('.new-book-form')
  .addEventListener('submit', newBookData);
