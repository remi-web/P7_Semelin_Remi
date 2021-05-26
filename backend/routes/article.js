
const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const article = require('../controllers/article')
const comment = require('../controllers/comment')

router.post ('/', article.create);
router.get('/', article.findAll);
router.get('/:id', article.findOne);
router.put('/:id', article.modify);
router.post('/:id/comments', comment.addComment);
router.delete('/:id', article.delete);


module.exports = router
