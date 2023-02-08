// require('dotenv').config();
// require('dotenv').config({ path: require('find-config')('.env') });

const newBookData = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#book-name').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const description = document.querySelector('#book-desc').value.trim();

  let baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
  // let apiKey = process.env.GB_KEY;
  let apiKey = 'AIzaSyAXDJg5GpbWtxabjgodzCP0w43gEuPYVPE';
  let bookName = name;
  let requestUrl = `${baseURL}${bookName}&key=${apiKey}`;

  // Fetch baseURL code snippet

  fetch(requestUrl)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data);
    });

  // end of fetch baseURl code snippet

  //   if (name && author && description) {
  //     const response = await fetch(`/api/books`, {
  //       method: 'POST',
  //       body: JSON.stringify({ name, author, description }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       document.location.replace('/profile');
  //     } else {
  //       alert('Failed to add book');
  //     }
  //   }
};
document
  .querySelector('.new-book-form')
  .addEventListener('submit', newBookData);
