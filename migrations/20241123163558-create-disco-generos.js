'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DiscoGeneros', {
      DiscoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Discos', // Nome da tabela dos discos
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      GeneroId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Generos', // Nome da tabela dos gêneros
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DiscoGeneros');
  }
};
