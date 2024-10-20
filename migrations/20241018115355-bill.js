'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('bill', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      client_code: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      installation_number: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      reference_date_month: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      reference_date_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      total_value: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      energy_qt: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      energy_value: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      energy_scee_s_icms_qt: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      energy_scee_s_icms_value: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      compensated_energy_qt: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      compensated_energy_value: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      public_lighting_value: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bill');
  }
};

