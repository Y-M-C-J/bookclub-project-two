const commentTitle = document.getElementById('comment-title')
const commentBody = document.getElementById('comment-body')
const addComment = document.getElementById('add-comment')



addComment.addEventListener('click', async () => {
    if (!commentTitle.value || !commentBody.value) return

    const book_id = addComment.getAttribute('data-bookId')
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            title: commentTitle.value,
            body: commentBody.value,
            book_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {
        window.location.replace(`/book/${book_id}`)
    }
})