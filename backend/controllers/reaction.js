const db = require("../models/index");
const jwt = require ('jsonwebtoken')
const article = require('../models/article');


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
},

exports.getReactions = async (req, res) => {
    article.id = req.params.id
    db.Reaction.findAll({
        attributes: [ 'id'],
        where:{ articleId: article.id},
            include:[
                { model: db.users, attributes: [ 'pseudo']},
                { model: db.reactionsTypes, attributes: [ 'name']},
            ],
            order: [['createdAt', 'DESC']]
        })
        .then(reactions => res.status(200).json({ reactions }))                    
        .catch(error => res.status(404).json({ error }))
},

exports.getReactionsTypes = async(req, res) => {
    db.ReactionsTypes.findAll({
        attributes: [ 'name', 'id']
    })
    .then(reactionsTypes => res.status(200).json({ reactionsTypes }))                    
    .catch(error => res.status(404).json({ error }))

}


