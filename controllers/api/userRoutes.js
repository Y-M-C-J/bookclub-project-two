const router = require('express').Router();
const { User } = require('../../models');
const ReadList = require('../../models/ReadList');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/addToReadList', async (req, res) => {
  try {
    //destructs the book_id from req.body it's like re.body.book_id just to avoid writing req.body every time
    const { book_id } = req.body;
    //check if book exist
    const bookExist = await ReadList.findOne({ where: { book_id } });
    let destroyed = false;

    //if book exists remove it
    if (bookExist) {
      bookExist.destroy();
      destroyed = true;
    }

    //if not exist add it
    else {
      await ReadList.create({
        user_id: req.session.user_id,
        book_id,
      });
    }

    //return the destroyed variable which indicated if the book added or removed
    res.status(200).json({
      destroyed,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
