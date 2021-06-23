const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth/auth')
const authModifyComment = require('../middleware/auth/modify-comment')
const comment = require('../controllers/comment')
const authDeleteComment = require('../middleware/auth/delete-comments')
// const ifArticleExist = require('../middleware/comment/comment')

router.post('/:id/comments', auth, comment.addComment)
router.put('/:id/comments/:id', authModifyComment, comment.modifyComment)
router.delete('/:id/comments/:id',  authDeleteComment, comment.deleteComment)
router.get('/:id/comments', auth, comment.getComments)
router.get('/:id/comments/count', auth, comment.getCountComments)

module.exports = router
