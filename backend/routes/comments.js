const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth/auth')
const authModifyComment = require('../middleware/auth/modify-comment')
const comment = require('../controllers/comment')
const authDeleteComment = require('../middleware/auth/delete-comments')


router.post('/:id/comments', auth, comment.addComment);
router.put('/:id/comments/:id', authModifyComment, comment.modifyComment);
router.delete('/:id/comments/:id',  authDeleteComment, comment.deleteComment)

module.exports = router
