const { sequelize } = require("../../models/index")
const db = require("../../models/index")


module.exports = async (req, res, next) => {
    try{
        db.Article.findAll({ 
            where:{ id: req.params.id },
            include:[
                { model: db.comments, attributes: [ 'note'] },
                { model: db.reactions, attributes: [ 'reactionTypeId']}
            ]
        })
            .then(article => {
                console.log(article[0].Comments[0])

                if( article[0].Comments[0] !== undefined) {
                    sequelize.query(`
                    DELETE  comments FROM comments
                    INNER JOIN  articles ON comments.articleId = articles.id
                    WHERE articles.id = ${req.params.id}`
                    )
                }
                if( article[0].Reactions[0] !== undefined) {
                    sequelize.query(
                    `DELETE reactions FROM reactions
                    INNER JOIN articles ON reactions.articleId = articles.id
                    WHERE articles.id = ${req.params.id}`
                    )
                }
                else{
                    next()
                }
                    
            })
                
            
        }
        catch{
            error => res.status(404).json({ message: "error middleware" })
        }
    
}