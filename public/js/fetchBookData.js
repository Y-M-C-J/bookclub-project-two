const newBookData = async (event) => {
  //prevent the form from refreshing the page
  event.preventDefault();

  //get ready the values for the POST request
  //we have removed the description field as we are adding it in the server
  const name = document.querySelector('#book-name').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const addBookBtn = document.querySelector('#addbook-btn');

  //instead of hading the if statement like this name && author (do only if the name and author exists) we want only when we have the name
  //so here if we don't have a name just directly return null and do nothing
  if (!name) return null;
  //else if we have a name continue

  //changing the text for add button to show the user that something is going on
  //and making the button disabled to prevent spamming the button
  addBookBtn.textContent = 'Adding...';
  addBookBtn.setAttribute('disabled', true);

  //inside try catch to prevent the adding... because the user is logged off so we catch the error
  try {
    //post request to the endpoint we built /api/books
    const response = await fetch(`/api/books`, {
      method: 'POST',
      //body we send name author no need for description as we fetch it in the server
      body: JSON.stringify({ name, author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //if the request is ok means the status code in the 200 range
    if (response.ok) {
      //then get me the json results
      //we can't do the await response.json() before checking the response.ok as sometimes we may have a server error
      //and it will not return a json so we will have and error here as the server is not sending a valid json
      const data = await response.json();

      //create a book html element with the newBook data
      const newBook = `
      <a href="/book/${data.newBook.id}">
        <div class="profile-book">
          <img src=${data.newBook.thumbnail} style="height: 180px;width: 128px;" />
          <h6 class="h4 d-inline-block text-truncate" style="max-width: 128px;">${data.newBook.name}</h6>
          <button onclick="deleteBook(event,${data.newBook.id})" class="btn btn-sm btn-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 448 512">
              <path fill="#fff"
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
          </button>
        </div>
      </a>`;

      //we append the book to the #current-books parent before end
      document
        .querySelector('#current-books')
        .insertAdjacentHTML('beforeend', newBook);

      //when all this is dine put back the button to the normal state
      addBookBtn.textContent = 'Add';
      addBookBtn.removeAttribute('disabled');
    } else {
      alert('Failed to add book');
    }
  } catch (err) {
    //if there is an error show the alert and reload
    alert('Failed to add book');
    window.location.reload();
  }
};

const deleteBook = async (event, id) => {
  event.preventDefault();

  const response = await fetch(`/api/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    window.location.replace('/profile');
  }
};

document
  .querySelector('.new-book-form')
  .addEventListener('submit', newBookData);
