
const express = require('express')
const router = express.Router()

const multer= require('../middleware/multer/multer-config')

const auth = require('../middleware/auth/auth')
const authModifyArticle = require('../middleware/auth/modify-article')
const authDeleteArticle = require('../middleware/auth/delete-article')
const article = require('../controllers/article')

router.post ('/', auth, multer, article.create);
router.get('/', auth, article.findAll);
router.get('/:id', auth, article.findOne);
router.put('/:id', authModifyArticle, article.modify);
router.delete('/:id', authDeleteArticle, article.delete);


module.exports = router
