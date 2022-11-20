'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let company = [
      {
        company_name: "Test Company",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Companies', company)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null)
  }
};
