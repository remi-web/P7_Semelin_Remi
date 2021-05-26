const { Sequelize } = require('sequelize');
const db = require("../models/index");
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');

exports.signup = async (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = ({
                firstName: req.body.prenom,
                email: req.body.email,
                lastName: req.body.nom,
                pseudo: req.body.pseudo,
                password: hash,
                roleId: 1
            });
            db.User.create(user)
                .then(user => res.status(201).json({message: "utilisateur créé"}))
                .catch(error => res.status (400).json({ error }))
        })
    .catch(error => res.status(500).json({ message: "problème" }))

}

exports.login = (req, res, next) => {
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
    db.User.findOne({ where:{ email: req.body.email }})
        .then( user => {
            if(!user){
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            } 
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !'})
                    }
                    res.status(200).json({ user })
                })
            })   
    .catch( error => res.status(400).json({ error }))
}

exports.modify = (req, res) => {
    db.User.findOne({ where:{ id: req.params.id }})
        .then(user => {
            user.update({
                firstName: req.body.prenom,
                email: req.body.email,
                lastName: req.body.nom,
                pseudo: req.body.pseudo,
                // password: req.body.password,
            })
            .then(() => res.status(200).json({ message: "Données utilisateur modifiées"}))
            .catch( error => res.status(400).json({ error }))
        })
        .catch( error => res.status(404).json({ error }))
}




    
