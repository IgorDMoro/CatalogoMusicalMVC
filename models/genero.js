'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genero extends Model {
    static associate(models) {
      // Um Gênero pode estar relacionado a vários Discos
      Genero.belongsToMany(models.Disco, {
        through: 'DiscoGeneros',
        as: 'discos',
        foreignKey: 'GeneroId',
        otherKey: 'DiscoId'
      });

      // Um Gênero pode estar relacionado a vários Artistas
      Genero.belongsToMany(models.Artista, {
        through: 'ArtistaGeneros',
        as: 'artistas',
        foreignKey: 'GeneroId',
        otherKey: 'ArtistaId'
      });
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
