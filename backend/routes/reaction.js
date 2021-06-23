const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth/auth')
const reaction = require('../controllers/reaction')

router.post('/:id/reactions',  auth, reaction.addReaction);
router.get('/:id/reactions', auth, reaction.getReactions)
router.get('/:id/reactionsTypes', auth, reaction.getReactionsTypes)
router.get('/:id/reactions/count', auth, reaction.getCountReactions)

module.exports = router
