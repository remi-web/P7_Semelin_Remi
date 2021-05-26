const db = require("../../models/index");
const jwt = require('jsonwebtoken');

// Authentification pour supprimer ou modifier

module.exports = async ( req, res, next) => {

    try {  
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        db.User.findOne({ where:{ id: req.params.id }})  
            .then(user => {
                if (user.id != userId) {   
                    res.status(401).send({ error: 'Acces non authorisé' });
                }
                else{
                    next ()
                }
            })
            .catch(error => res.status(404).json({ error: "Utilisateur introuvable" }));
    }
    catch {
        res.status(400).json({ message: "Requete invalide"})
    }
}


    
      

    