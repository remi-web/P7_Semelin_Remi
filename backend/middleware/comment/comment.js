const db = require("../../models/index");
const express= require('express')

module.exports = async (req, res, next) => {

    try{
        db.Article.findAll(req.params.id)
            .then(article => {
                if(!article) {
                    throw "impossible d'ajouter un commentaire sur un article inexistant";
                }
                else {
                    next()
                }
            })
            .catch(error => res.status(401).json({ error }))
    }
    catch {
        res.status(401).json({ error })
    }
} 

