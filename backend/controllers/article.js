const db = require("../models/index");
const jwt = require ('jsonwebtoken');
const { sequelize } = require("../models/index");


exports.create = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const article = ({
        body: req.body.body,
        userId: decodedToken.userId,
        title: req.body.title,
    });
    db.Article.create (article)
        .then( article => res.status(201).json({message: "article enregistré"}))
        .catch(error => res.status (400).json((error)))
}

exports.findAll = async(req, res) => {
    db.Article.findAll ({
        attributes: [ 'body', 'id', 'userId'],
        include: [
            { model: db.comments, attributes: ['id', 'note', 'userId'] },
            { model: db.reactions, attributes: [ 'reactionTypeId'] }
        ]
    })
        .then( articles => res.status(200).json({articles}))
        .catch(error => res.status (404).json((error)))
}

exports.findOne = async(req, res) => {
    db.Article.findAll({
        attributes:  [ 'body' ],
        where:{ id: req.params.id },
        include: [
            { model: db.comments, attributes: [ 'note'] },
            { model: db.reactions, attributes: [ 'reactionTypeId']}
        ]
    })
        .then(article => res.status(200).json({ article }))
        
        .catch(error => res.status(404).json({ error }))
}

exports.modify = async (req, res, next) => {
    db.Article.findOne({ where:{ id: req.params.id }})
        .then(article => {
            article.update({
                title: req.body.title,
                body: req.body.body
            })
                .then(article => res.status(200).json({ message: "Article modifié"}))
                .catch( error => res.status(400).json({ error }))
        })
        .catch(error => res.status(404).json({ error }))
}

exports.delete = async (req, res, next) => {
   sequelize.query(
       `DELETE articles FROM articles
        INNER JOIN comments ON comments.articleId = articles.id
        INNER JOIN reations ON reactions.articleId = article.id
        WHERE articles.id = ${req.params.id}`
    )
    .then(() => res.status(200).json({ message: "Article supprimé"}))
    .catch( error => res.status(400).json({ error }))
}

