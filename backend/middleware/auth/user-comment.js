// const { Sequelize, json } = require('sequelize');
const db = require("../../models/index");
const jwt = require('jsonwebtoken');

// Authentification pour supprimer ou modifier

module.exports = async ( req, res, next) => {

    try {  
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        db.Comment.findAll({ 
            where:{ id: req.params.id },
            include: [{ model: db.users }]
        })
            .then(comment => {
                if (comment[0].userId != userId) {   
                    res.status(401).send({ error: 'Acces non authorisé' });
                }
                else{
                    next ()
                }
            })
            .catch(error => res.status(404).json({ error: "Commentaire introuvable" }));
    }
    catch {
        res.status(400).json({ message: "Requete invalide"})
    }
}


    
      

    