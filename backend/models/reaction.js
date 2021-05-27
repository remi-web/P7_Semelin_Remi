'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    
    static associate(models) {
       
        models.Reaction.belongsTo(models.User,{
            foreignKey: "userId"
        })
    }
  };
  Reaction.init({
    userId: DataTypes.NUMBER,
    articleId: DataTypes.NUMBER,
    reactionTypeId: DataTypes.NUMBER,

  }, {
    sequelize,
    modelName: 'Reaction',
  });
  return Reaction;
};