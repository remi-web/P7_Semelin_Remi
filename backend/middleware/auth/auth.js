
const jwt = require('jsonwebtoken');

//  Authentification de connection

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId
    console.log(userId)
      if (req.body.userId && req.body.userId !== userId ) {
        throw 'Invalid user ID';
      }
      else {
        next();
      }
    }
  catch {
      res.status(400).json({
        error: "problème d'authentification"
    });
  } 
};




