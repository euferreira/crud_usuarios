'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    static associate(models) {
      // define association here
    }
  }
  usuarios.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};