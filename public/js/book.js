//get the data ready for the POST request
const commentTitle = document.getElementById('comment-title');
const commentBody = document.getElementById('comment-body');

//add button
const addComment = document.getElementById('add-comment');

//add book to read list
const addToReadlist = document.getElementById('add-readlist');

//when we click add comment
addComment.addEventListener('click', async () => {
  //if there is no title or no body return null and do nothing
  if (!commentTitle.value || !commentBody.value) return null;

  //else (means we have both of them)

  //we get the bookId we want to add the comment on with bookId data attribute
  const book_id = addComment.getAttribute('data-bookId');

  //simple post request
  const response = await fetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify({
      title: commentTitle.value,
      body: commentBody.value,
      book_id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //if the response is ok or fine (status in the 200 range)
  if (response.ok) {
    window.location.replace(`/book/${book_id}`);
  } else {
    //else there is an error ? show the following alert
    alert('Cannot add a comment, try again later');
  }
});

//
addToReadlist.addEventListener('click', async () => {
  //set button disabled to prevent the spam
  addToReadlist.setAttribute('disabled', true);

  //get bookid from the data attribute
  const book_id = addToReadlist.getAttribute('data-bookId');

  try {
    //post request with book_id to the endpoint we already added
    const response = await fetch(`/api/users/addToReadList`, {
      method: 'POST',
      body: JSON.stringify({ book_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //if the response is ok or fine (status in the 200 range)
    if (response.ok) {
      const data = await response.json();

      //show a nice alert with the following data
      Swal.fire({
        title: 'Good Job!',
        text: data.destroyed
          ? 'Book has been removed from your read list'
          : 'Book has been added to your read list',
        icon: 'success',
      });
      // alert(data.destroyed ? 'Book has been removed from your Read List' : 'Book has been added to your Read List')
      addToReadlist.textContent = data.destroyed
        ? 'Read this book'
        : 'Remove from Read List';
    } else {
      //else there is an error ? show the following error alert
      Swal.fire({
        title: 'Something went wrong',
        text: 'Cannot perform this request, try again later',
        icon: 'error',
      });
    }
  } catch (err) {
    window.location.reload();
  }

  //put back the attribute to
  addToReadlist.removeAttribute('disabled');
});
