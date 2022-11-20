'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Merchant.hasMany(models.Transaction, {foreignKey: 'merchant_id'})
    }
  }
  Merchant.init({
    merchant_name: DataTypes.STRING,
    merchant_address: DataTypes.STRING,
    created_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};