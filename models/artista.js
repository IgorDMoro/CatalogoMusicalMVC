'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artista extends Model {
    static associate(models) {
      // Um Artista tem muitos Discos
      Artista.hasMany(models.Disco, { foreignKey: 'ArtistaId', as: 'discos' });
      
      // Um Artista pode estar relacionado a vários Gêneros
      Artista.belongsToMany(models.Genero, {
        through: 'ArtistaGeneros',
        as: 'generos',
        foreignKey: 'ArtistaId',
        otherKey: 'GeneroId'
      });
    }
  }
  Artista.init({
    nome: DataTypes.STRING,
    genero_musical: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artista',
  });
  return Artista;
};
