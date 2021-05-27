
const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth/auth')
const authUserComment = require('../middleware/auth/user-comment')
const comment = require('../controllers/comment')
const moderator = require('../middleware/auth/moderator')


router.post('/:id/comments', auth, comment.addComment);
router.put('/:id/comments/:id', authUserComment,comment.modifyComment);
router.delete('/:id/comments/:id', moderator || authUserComment, comment.delete)


module.exports = router
