'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Faixa extends Model {
    static associate(models) {
      // Uma Faixa pertence a um Disco
      Faixa.belongsTo(models.Disco, { foreignKey: 'DiscoId', as: 'disco' });
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
