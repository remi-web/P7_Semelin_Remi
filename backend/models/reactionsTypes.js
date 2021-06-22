'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReactionsTypes extends Model {
    
    static associate(models) {
       
        models.ReactionsTypes.belongsTo(models.Reaction,{
            foreignKey: "ractionTypeId"
        })
    }
  };
  ReactionsTypes.init({
    name: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'ReactionsTypes',
  });
  return ReactionsTypes;
};