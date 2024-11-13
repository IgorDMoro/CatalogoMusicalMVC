'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faixa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Faixa.init({
    titulo: DataTypes.STRING,
    DiscoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Faixa',
  });
  return Faixa;
};