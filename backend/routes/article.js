
const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth/auth')
const authArticle = require('../middleware/auth/article')
const authComment = require('../middleware/auth/comment')
const article = require('../controllers/article')
const comment = require('../controllers/comment')
const moderator = require('../middleware/auth/moderator')

router.post ('/', auth, article.create);
router.get('/', auth, article.findAll);
router.get('/:id', auth, article.findOne);
router.put('/:id', authArticle, article.modify);
router.delete('/:id', authArticle, article.delete);
router.post('/:id/comments', auth, comment.addComment);
router.put('/:id/comments/:id', auth, moderator || authComment,comment.modifyComment);
router.delete('/:id/comments/:id', authComment, comment.delete)


module.exports = router
