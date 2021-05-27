const db = require("../../models/index");
const jwt = require('jsonwebtoken');
const user = require("../../models/user");
const role = require("../../models/role");

module.exports = async ( req, res, next) => {

    try {  
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        db.User.findAll({ 
            where:{ id: userId} ,
            include: [{ model: db.roles }]
        })
        .then(user => {
            if (user[0].roleId != 2){
                res.status(401).send({ error: 'Acces non authorisé' });
            }
            else{
                next()
            }
        })
        
    }
    catch {
        res.status(400).json({ message: "Requete invalide"})
    }
}