// require('dotenv').config();
// require('dotenv').config({ path: require('find-config')('.env') });

const newBookData = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#book-name').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const description = document.querySelector('#book-desc')?.value?.trim();
  const addBookBtn = document.querySelector('#addbook-btn')

  if (name && author) {
    addBookBtn.textContent = 'Adding...'
    addBookBtn.setAttribute('disabled', true)
    const response = await fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify({ name, author, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json()

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
      </a>`

      document.querySelector('#current-books').insertAdjacentHTML('beforeend', newBook)

      addBookBtn.textContent = 'Add'
      addBookBtn.removeAttribute('disabled')
      console.log(data.bookVolumes)

    } else {
      alert('Failed to add book');
    }
  }
};

const deleteBook = async (event, id) => {
  event.preventDefault();

  const response = await fetch(`/api/books/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    window.location.replace('/profile')
  }
}


document
  .querySelector('.new-book-form')
  .addEventListener('submit', newBookData);