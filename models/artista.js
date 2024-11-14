'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Artista.associate = function(models) {
        Artista.hasMany(models.Disco, { foreignKey: 'ArtistaId' });
        Artista.belongsToMany(models.Genero, { through: 'ArtistaGeneros' });
     };
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
