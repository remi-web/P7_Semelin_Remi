const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth/auth')
const reaction = require('../controllers/reaction')

router.post ('/:id/reactions',  reaction.addReaction);


module.exports = router
