const router = require('express').Router();
const { Book } = require('../../models'); // import the model
const withAuth = require('../../utils/auth'); // to check if user is logged in
const nodeFetch = require('node-fetch');

// create a new book and associate the book with the user
router.post('/', withAuth, async (req, res) => {
  try {
    let baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
    let apiKey = process.env.API_KEY;
    let bookName = req.body.name;
    let requestUrl = `${baseURL}${bookName}&key=${apiKey}`;

    const bookVolumesRes = await nodeFetch(requestUrl);
    let bookVolumes = await bookVolumesRes.json();
    let bookImage = bookVolumes?.items.filter(
      (b) => b?.volumeInfo?.imageLinks?.thumbnail
    );
    let bookDescription = bookVolumes?.items.filter(
      (b) => b?.volumeInfo?.description
    );

    let thumbnail =
      'https://ankan-kagoshima.jp/data/wp-content/themes/cms/images/dvd/noimage.jpg';
    let description = 'No description available for this book';

    if (bookImage?.length) {
      thumbnail = bookImage[0]?.volumeInfo?.imageLinks?.thumbnail;
    }

    if (bookDescription?.length) {
      description = bookDescription[0]?.volumeInfo?.description;
    }
    // create a new book with the user_id from the session
    const newBook = await Book.create({
      ...req.body,
      thumbnail,
      description,
      user_id: req.session.user_id, // add the user_id from the session to the new book
    });
    // associate the book with the user
    await newBook.addUser(req.session.user_id, {
      through: { selfGranted: false }, // make the user not be able to see the book
    });

    res.status(200).json({ newBook, bookVolumes }); // send back the book
  } catch (err) {
    // catch any errors
    console.log(err);
    res.status(400).json(err); // send back the error
  }
});

// associate the book with the user
router.post('/:id', withAuth, async (req, res) => {
  try {
    // find the book by its id
    const findBook = await Book.findByPk(req.params.id, {});

    // associate the book with the user
    await findBook.addUser(req.session.user_id, {
      through: { selfGranted: false }, // add self-granting to the book
    });

    res.status(200).json(findBook); // send back the book
  } catch (err) {
    // catch any errors
    res.status(400).json(err); // send back the error
  }
});

// delete a book that's associated with the user
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // destroy the book data that matches the book's id and the user's id
    const bookData = await Book.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // if the book is not found, return a 404 error message
    if (!bookData) {
      res.status(404).json({ message: 'No book found with this id!' });
      return;
    }

    res.status(200).json(bookData); // send back the book
  } catch (err) {
    // catch any errors
    res.status(500).json(err); // send back the error
  }
});

// export the router
module.exports = router;
