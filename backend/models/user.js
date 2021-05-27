'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
        models.User.hasMany(models.Comment)
        models.User.belongsTo(models.Role,{
          foreignKey: "roleId"
        })

    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};