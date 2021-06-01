const express = require('express');
const bodyParser = require ('body-parser');
const path = require('path');
const usersRoutes = require('./routes/user');

const articlesRoutes = require('./routes/article')
const commentsRoutes = require('./routes/comments')
const reactionsRoutes = require('./routes/reaction')

// const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
// const db = require('./models');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const sequelize = new Sequelize("Groupomania", "root", "remix4226", {
  dialect: "mysql",
  host: "localhost"
});

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
 
} 
catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', usersRoutes);
app.use('/api/articles', articlesRoutes)
app.use('/api/articles', commentsRoutes)
app.use('/api/articles', reactionsRoutes)

module.exports = app;
