const router = require('express').Router();
const { Comment } = require('../../models'); // import the model
const withAuth = require('../../utils/auth'); // to check if user is logged in


router.post('/', withAuth, async (req, res) => {
    try {
        //just creating a simple comment in the comments page with the book it, nothing fancy
        const comment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        //and here we return the comment as json
        res.status(200).json(comment)
    } catch (err) {
        
        res.status(500).json(err);
    }
})


// export the router
module.exports = router;

