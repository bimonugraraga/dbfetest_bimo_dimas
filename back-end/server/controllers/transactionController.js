const TransactionServices = require('../services/transactionServices')
class TransactionController {
  static getAllTransaction = async(req, res, next) => {
    try {
      let {merchant_name, sorted_from, sorted_by, limit, page} = req.query
      let params = {
        limit: !limit ? 10: +limit,
        page: !page? 0: +page,
        merchant_name: !merchant_name? "": merchant_name,
        sorted_from: !sorted_from? "id": sorted_from,
        sorted_by: !sorted_by? "ASC": sorted_by
      }
      let allTransactions = await TransactionServices.getAllTransactions(params, next)
      if (allTransactions){
        res.status(200).json(allTransactions)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController