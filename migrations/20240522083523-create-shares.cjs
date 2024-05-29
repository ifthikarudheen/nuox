'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_amount: {
        type: Sequelize.DECIMAL
      },
      duration: {
        type: Sequelize.INTEGER
      },
      installment_type: {
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.DATE
      },
      due_amount: {
        type: Sequelize.DECIMAL
      },
      paid_amount: {
        type: Sequelize.DECIMAL
      },
      shareholder_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shareholders', // name of the target model
          key: 'id',             // key in the target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shares');
  }
};