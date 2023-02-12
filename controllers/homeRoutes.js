const router = require('express').Router();
const { Book, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
const ReadList = require('../models/ReadList');

router.get('/', async (req, res) => {
  try {
    // Get all books and JOIN with user data
    const bookData = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const books = bookData
      .map((book) => book.get({ plain: true }))
      .map((book) => {
        book.user = book.users[0]
        return book
      })
      ;

    // Pass serialized data and session flag into template
    res.render('homepage', {
      books,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: {
            model: User
          }
        }
      ],
    });

    const book = bookData.get({ plain: true });
    book.user = book.users[0]


    const readListBook = await ReadList.findOne({ where: { book_id: book.id } })

    res.render('book', {
      ...book,
      in_readlist: readListBook ? true : false,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Book }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/readList', withAuth, async (req, res) => {
  try {
    //find all books and include the book with them 
    const readListData = await ReadList.findAll({
      where: { user_id: req.session.user_id },
      include: Book,
    })


    // Serialize data so the template can read it
    const readList = readListData.map((list) => list.get({ plain: true }))

    //render readlist.handlebars page
    //send count variable so we can check if there is any books in the readlist
    res.render('readlist', {
      readList,
      count: readList.length,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});



//search book by query route (q means query)
router.get('/search', async (req, res) => {
  //get the q query paramenter from url
  const { q } = req.query

  //if the q has a value then we will search a book
  const where = q ? {

    //Sequelize.Op.or is the OR operator in a SQL statment
    //so we want to match the name or author or description
    [Sequelize.Op.or]: [
      //Sequelize.Op.like is the LIKE operator in a SQL statment
      //SELECT * FROM book WHERE name LIKE '%harry%' OR author LIKE '%harry%' OR description LIKE '%harry%'
      //like this we have a deep search in books
      { name: { [Sequelize.Op.like]: `%${q}%` } },
      { author: { [Sequelize.Op.like]: `%${q}%` } },
      { description: { [Sequelize.Op.like]: `%${q}%` } },
    ],
  }
    //else we will return a empty object means get all {}
    : {}
  //just search and include the user model so we can show this book is by which user...
  const bookData = await Book.findAll({
    where,
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });

  // Serialize data so the template can read it and assign the user
  const books = bookData
    .map((book) => book.get({ plain: true }))
    .map((book) => {
      book.user = book.users[0]
      return book
    })
    ;

  //render page with the given data
  res.render('homepage', {
    books,
    logged_in: req.session.logged_in,
  });
})


module.exports = router;
