'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let sendTransaction = []
    for (let i = 1; i <= 100; i++){
      let tempObj = {
        company_id: 1,
        purpose: "TESTING",
        amount: Math.ceil(Math.random() * 100000),
        created_by: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      if (i <= 10){
        tempObj.description = "FOR XL"
        tempObj.merchant_id = 3
      } else if(i <= 40) {
        tempObj.description = "FOR Indosat"
        tempObj.merchant_id = 2
      } else {
        tempObj.description = "FOR Telkomsel"
        tempObj.merchant_id = 1
      }
      sendTransaction.push(tempObj)
    }
    await queryInterface.bulkInsert('Transactions', sendTransaction)
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Transactions', null)
  }
};
