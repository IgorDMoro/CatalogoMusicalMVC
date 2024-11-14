'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Genero.associate = function(models) {
        Genero.belongsToMany(models.Disco, { through: 'DiscoGeneros' });
        Genero.belongsToMany(models.Artista, { through: 'ArtistaGeneros' });
     };
    }
  }
  Genero.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genero',
  });
  return Genero;
};