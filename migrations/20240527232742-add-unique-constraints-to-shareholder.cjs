'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Shareholders', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });

    await queryInterface.changeColumn('Shareholders', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Shareholders', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    });

    await queryInterface.changeColumn('Shareholders', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    });
  }
};

