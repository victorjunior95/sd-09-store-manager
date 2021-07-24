const salesModel = require('../models/Sales');

const createSale = (sales) => salesModel.createSale(sales);

module.exports = { createSale };