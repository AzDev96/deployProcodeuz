'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PortfolioLogos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING.STRING(50),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING.STRING(50),
        allowNull: false,
      },
      cover_img: {
        type: Sequelize.STRING.STRING(50),
        allowNull: false,
      },
      silka: {
        type: Sequelize.STRING.STRING(50),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PortfolioLogos');
  }
};