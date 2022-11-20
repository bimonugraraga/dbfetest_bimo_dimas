const {Company, Transaction, Merchant, sequelize, Sequelize} = require('../models')
const {Op} = require('sequelize'); 
class TransactionServices {
  static getAllTransactions = async(params, next) => {
    try {
      let offset = params.page * params.limit

      let whereMerchant = {}
      if (params.merchant_name){
        whereMerchant.merchant_name = {
          [Op.iLike]: `%${params.merchant_name}%`
        }
      }

      let allTransactions = await Transaction.findAndCountAll({
        include: [
          {
            model: Company
          },
          {
            model: Merchant,
            where: whereMerchant
          }
        ],
        limit: params.limit,
        offset: offset,
        order: [
          [params.sorted_from, params.sorted_by]
        ],
        distinct: true
      })
      return allTransactions
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionServices