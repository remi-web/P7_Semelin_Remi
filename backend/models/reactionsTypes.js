'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReactionsTypes extends Model {
    
    static associate(models) {
       
        models.ReactionsTypes.hasMany(models.Reaction,{
            foreignKey: "id"
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