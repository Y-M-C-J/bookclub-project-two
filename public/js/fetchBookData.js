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
      <a href="/book/${data.newBook.id}" class="mx-auto md:mx-0 w-fit">
          <div class="profile-book relative">
            <img src=${data.newBook.thumbnail} alt="Book Cover"
              class="hover:-translate-y-2 duration-200 w-[128px] h-[180px] md:w-[192px] md:h-[287px] mb-5 drop-shadow-xl">
            <h5 class="font-medium">${data.newBook.author}</h5>
            <p class="truncate max-w-[128px] md:max-w-[192px]">${data.newBook.name}</p>

            <button onclick="deleteBook(event,${data.newBook.id})" class="bg-red-500 rounded p-2 absolute top-1 right-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4 text-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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
