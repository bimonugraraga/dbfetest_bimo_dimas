'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Merchant, {foreignKey: 'merchant_id'})
      Transaction.belongsTo(models.Company, {foreignKey: 'company_id'})
    }
  }
  Transaction.init({
    company_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    purpose: DataTypes.STRING,
    merchant_id: DataTypes.INTEGER,
    amount: DataTypes.BIGINT,
    created_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};