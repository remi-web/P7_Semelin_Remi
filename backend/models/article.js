'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    
    static associate(models) {
      models.Article.hasMany(models.Comment),
      models.Article.hasMany(models.Reaction),
      models.Article.belongsTo(models.User)
    }
  };
  Article.init({
    imageUrl: DataTypes.STRING,
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