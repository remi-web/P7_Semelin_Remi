const db = require("../../models/index");
const bcrypt = require ('bcrypt');

module.exports = async ( req, res ) => {
    try{
        db.User.findOne({ where:{email: req.body.email}})
        .then(user => {
            if(!user){
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            } 
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(valid) {
                   return res.status(200).json({ message: "authorisation" })
                }
                else{
                   return res.status(401).json({ massage: "refusé"})
                }
                
            })
        })
    }
    catch {
        res.status(400).json({ message: "Requete invalide"})
    }
}