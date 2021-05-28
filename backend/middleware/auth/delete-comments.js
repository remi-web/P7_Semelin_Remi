const db = require("../../models/index");
const jwt = require('jsonwebtoken');
// const user = require("../../models/user");
// const role = require("../../models/role");

module.exports = async ( req, res, next) => {

    try {  
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        // check if the user is the modarator
        db.User.findAll({ 
            where:{ id: userId} ,
        })
        .then(user => {
            if (user[0].roleId == 2){
                next()
            }
            else{
            // check if the userId == comment.userId
                try {              
                    db.Comment.findAll({ 
                        attributes: [ 'id', 'userId'],
                        where:{ id: req.params.id },
                        include: [{ model: db.articles, attributes: ['id'] }]
                    })
                        .then(comment => {
                            console.log(comment)
                            console.log(userId)
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
                    res.status(400).json({ message: "Requete 'comments' invalide"})
                }
            }
        })
    }
    catch {
        res.status(400).json({ message: "Requete 'user'invalide"})
    }
}
