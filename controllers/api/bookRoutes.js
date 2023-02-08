const router = require('express').Router();
const { Book } = require('../../models'); // import the model
const withAuth = require('../../utils/auth'); // to check if user is logged in

// create a new book and associate the book with the user
router.post('/', withAuth, async (req, res) => {
  try {
    // create a new book with the user_id from the session
    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.user_id, // add the user_id from the session to the new book
    });
    // associate the book with the user
    await newBook.addUser(req.session.user_id, {
      through: { selfGranted: false }, // make the user not be able to see the book
    });

    res.status(200).json(newBook); // send back the book
  } catch (err) { // catch any errors
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
  } catch (err) { // catch any errors
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
  } catch (err) { // catch any errors
    res.status(500).json(err); // send back the error
  }
});
// export the router
module.exports = router; 

