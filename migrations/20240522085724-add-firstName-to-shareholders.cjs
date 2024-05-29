'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Shareholders', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false, // or true, depending on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Shareholders', 'firstName');
  }
};

