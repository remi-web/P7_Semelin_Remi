
const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const article = require('../controllers/article')
const comment = require('../controllers/comment')

router.post ('/', auth, article.create);
router.get('/', auth, article.findAll);
router.get('/:id', auth, article.findOne);
router.put('/:id', auth, article.modify);
router.delete('/:id', auth, article.delete);
router.post('/:id/comments', auth, comment.addComment);
router.put('/:id/comments/:id', auth, comment.modifyComment);
router.delete('/:id/comments/:id', auth, comment.delete)


module.exports = router
