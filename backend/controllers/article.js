const db = require("../models/index");
const jwt = require ('jsonwebtoken');
const { sequelize } = require("../models/index")
const fs = require('fs')



exports.create = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken.userId)

    const article = ({
        body: req.body.body,
        userId: decodedToken.userId,
        // title: req.body.title,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    }); 
    console.log(article)
    db.Article.create (article)
    
        .then( article => {
            db.Article.findAll({
                attributes:  [ 'body','id', 'userId', 'imageUrl' ],
                where:{ id: article.id },
                include: [
                    { model: db.comments, attributes: [ 'note'] },
                    { model: db.reactions, attributes: [ 'reactionTypeId']},
                    { model: db.users, attributes: [ 'pseudo']}
                ]
            })
            .then(article => res.status(200).json({ article }))                    
            .catch(error => res.status(404).json({ error }))
        })
        .catch(error => res.status (400).json((error)))
}

exports.findAll = async(req, res) => {
    db.Article.findAll ({
        attributes: [ 'body', 'id', 'userId', 'imageUrl'],
        include: [
            { model: db.comments, attributes: ['id', 'note', 'userId'] },
            { model: db.reactions, attributes: [ 'reactionTypeId'] },
            { model: db.users, attributes: [ 'pseudo']}
        ],
        order: [['createdAt', 'DESC']]
    })
        .then( articles => res.status(200).json({articles}))
        .catch(error => res.status (404).json((error)))
}

exports.findOne = async(req, res) => {
    db.Article.findAll({
        attributes:  [ 'body','id', 'userId', 'imageUrl' ],
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
                body: req.body.body,
                // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

            })
                .then(article => res.status(200).json({ message: "Article modifié"}))
                .catch( error => res.status(400).json({ error }))
        })
        .catch(error => res.status(404).json({ error }))
}

exports.delete = async (req, res, next) => {
    db.Article.findOne({
        where:{ id: req.params.id },
    })
    .then(article => {
        article.destroy()
        /*
        sequelize.query(`
            DELETE articles FROM articles
            WHERE articles.id = ${req.params.id}`
        )
        */        
        if( article.imageUrl != null){
            const filename = article.imageUrl.split('/images/')[1]
            console.log(filename)
            fs.unlink(`images/${filename}`, () => {
            })
        }
        res.status(201).json({ message: "article supprimé"})
        
    })
    .catch( error => res.status(400).json({ error }))
}

