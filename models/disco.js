'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Disco extends Model {
    static associate(models) {
      // Um Disco pertence a um Artista
      Disco.belongsTo(models.Artista, { foreignKey: 'ArtistaId', as: 'artista' });

      // Um Disco tem várias Faixas
      Disco.hasMany(models.Faixa, { foreignKey: 'DiscoId', as: 'faixas' });

      // Um Disco pode estar relacionado a vários Gêneros
      Disco.belongsToMany(models.Genero, {
        through: 'DiscoGeneros',
        as: 'generos',
        foreignKey: 'DiscoId',
        otherKey: 'GeneroId'
      });
    }
  }
  Disco.init({
    titulo: DataTypes.STRING,
    ano_lancamento: DataTypes.INTEGER,
    capa: DataTypes.STRING,
    ArtistaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Disco',
  });
  return Disco;
};
