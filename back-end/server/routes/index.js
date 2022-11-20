const express = require('express');
const route = express();
const transactionRoute = require('./transaction')

route.use('/transactions', transactionRoute)
module.exports = route