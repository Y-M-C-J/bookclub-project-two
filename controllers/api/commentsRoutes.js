const router = require('express').Router();
const { Comment } = require('../../models'); // import the model
const withAuth = require('../../utils/auth'); // to check if user is logged in


router.post('/', withAuth, async (req, res) => {
    try {
        const comment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json(err);
    }
})


// export the router
module.exports = router;

