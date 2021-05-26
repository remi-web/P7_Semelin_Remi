'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate(models) {
        models.Comment.belongsTo(models.Article, {
            foreignKey: 'articles.id'
        })
        
    }
  };
  Comment.init({
    note: DataTypes.STRING,
    userId: DataTypes.NUMBER,
    articleId: DataTypes.NUMBER,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};