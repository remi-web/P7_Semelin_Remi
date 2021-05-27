
const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth/auth')
const authUserArticle = require('../middleware/auth/user-article')
const article = require('../controllers/article')
const moderator = require('../middleware/auth/moderator')

router.post ('/', auth, article.create);
router.get('/', auth, article.findAll);
router.get('/:id', auth, article.findOne);
router.put('/:id', authUserArticle, article.modify);
router.delete('/:id', moderator || authUserArticle, article.delete);


module.exports = router
