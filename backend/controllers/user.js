const { Sequelize } = require('sequelize');
const db = require("../models/index");
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');

const validator = require("email-validator")
const inputValidate = require('../models/model-password/password-validator')
const passwordValidate = inputValidate.passWordValidator

exports.signup = async (req, res, next) => {

    let passwordIsOk = passwordValidate.validate(req.body.password)
    let emailValidate = validator.validate(req.body.email)

    if ((emailValidate)  &&  (passwordIsOk === true)){
        bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                const user = ({
                    firstName: req.body.firstName,
                    email: req.body.email,
                    lastName: req.body.lastName,
                    pseudo: req.body.pseudo,
                    password: hash,
                    roleId: 1
                })
                db.User.create(user)
                    .then(user => res.status(201).json({message: "utilisateur créé"}))
                    .catch(error => res.status (400).json({ error }))
            })
        .catch(error => res.status(500).json({ message: "signup error" }))
    }
    else{
        return res.status(400).json({ message: "email error" })
    }
}

exports.login = (req, res) => {
    db.User.findOne({ where:{email: req.body.email}})
    .then(user => {
        if(!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        } 
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            })
        })
    })
    
    
    .catch(error => res.status(500).json({ error }))
}

exports.findOne = (req, res, next) =>{
    db.User.findOne({ where:{ id: req.params.id }})
        .then( user => {
            // if(!user){
                 res.status(200).json({ user});
            }) 
             
        .catch( error => res.status(400).json({ message: "err req findOne" }))
}

exports.modify = (req, res) => {
    db.User.findOne({ where:{ id: req.params.id }})
        .then(user => {
            user.update({
                firstName: req.body.prenom,
                email: req.body.email,
                lastName: req.body.nom,
                pseudo: req.body.pseudo,
            })
            .then(() => res.status(200).json({ message: "Données utilisateur modifiées"}))
            .catch( error => res.status(400).json({ error }))
        })
    .catch( error => res.status(404).json({ error }))
}

exports.delete = (req, res) => {
    db.Article.destroy({
        where:{ userId: req.params.id },
        include:[ { model: db.users, attributes: [ 'id']}]
    })
   
    db.User.destroy({ 
        where:{ id: req.params.id },
        include: [ {model: db.articles, attributes: [ 'id ']}]
    })
        .then(() => res.status(200).json({ message: " utilisateur supprimé"}))
        .catch(err => res.status(404).json({message: "erreur suppression"}))        
}




    
