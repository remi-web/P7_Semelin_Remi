'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    
    static associate(models) {
      
      models.Article.hasMany(models.Comment) 

    }
  };
  Article.init({
    body: DataTypes.STRING,
    userId: DataTypes.NUMBER,
    title: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};