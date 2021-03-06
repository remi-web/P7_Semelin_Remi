const { Sequelize, json, where } = require('sequelize');
const db = require("../models/index");
const jwt = require ('jsonwebtoken');
const article = require('../models/article');
const { users, comments } = require('../models/index');

exports.addComment = async (req, res, ) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const comment = ({
        note: req.body.note,
        articleId: req.params.id,
        userId: decodedToken.userId,
        
    });
    console.log(comment)
    db.Comment.create (comment)
        .then(comment => {
            db.Comment.findAll({
                attributes: [ 'id', 'userId', 'note'],
                 where:{ id: comment.id},
                include:[
                    { model: db.users, attributes: [ 'pseudo']}
                ]
            })
            .then(comment => res.status(200).json({ comment }))                    
            .catch(error => res.status(404).json({ error }))
        })
        
    .catch(error => res.status(400).json({ error }))
}

exports.modifyComment = async (req, res) => {
    db.Comment.findOne({ 
        where:{ id: req.params.id },
    })
    .then(comment => {  
            comment.update ({
                note: req.body.note
            })
            .then (() => res.status(200).json({ message: "Commentaire modifié"}))
            .catch( error => res.status(400).json({ error }))     
    })
    .catch(error => res.status(404).json({ error }))
}

exports.deleteComment = async (req, res) => {
    db.Comment.destroy({
        where: { id: req.params.id },
        // include: [{ model: db.articles }]
    })
        .then (() => res.status(200).json({ message: "Commentaire supprimé"}))
        .catch( error => res.status(400).json({ error }))        
    
    .catch(error => res.status(404).json({ error }))
}

exports.getComments = async ( req, res) => {
    article.id = req.params.id
    db.Comment.findAll({
        where:{ articleId: article.id},
        include:[
            { model: db.users, attributes: [ 'pseudo']},
        ],
        order: [['createdAt', 'DESC']]
    })
    .then(comments => res.status(200).json({ comments }))                    
    .catch(error => res.status(404).json({ error  }))
}

exports.getCountComments = ( req, res) => {
    db.Comment.count({
        where:{ articleId: req.params.id}
    })
    .then(countComments => res.status(200).json({ countComments }))                    
    .catch(error => res.status(404).json({ error  }))
}