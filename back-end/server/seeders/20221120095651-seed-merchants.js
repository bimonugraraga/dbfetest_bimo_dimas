'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let merchants = [
      {
        merchant_name: "Telkomsel",
        merchant_address: "Jakarta",
        created_by: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        merchant_name: "Indosat",
        merchant_address: "Jakarta",
        created_by: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        merchant_name: "XL",
        merchant_address: "Jakarta",
        created_by: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Merchants', merchants)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Merchants', null)
  }
};
