const db = require("../models/index");
const jwt = require ('jsonwebtoken')

exports.addReaction = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const reaction = ({
        articleId: req.params.id,
        userId: decodedToken.userId,
        reactionTypeId: req.body.reaction
    });
    db.Reaction.create (reaction)
        .then(() => res.status(201).json({ message: "Reaction ajouté"}))
        .catch(error => res.status(400).json({ error }))
}