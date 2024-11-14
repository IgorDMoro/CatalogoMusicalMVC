'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Disco.associate = function(models) {
        Disco.belongsTo(models.Artista, { foreignKey: 'ArtistaId' });
        Disco.hasMany(models.Faixa, { foreignKey: 'DiscoId' });
        Disco.belongsToMany(models.Genero, { through: 'DiscoGeneros' });
     };
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