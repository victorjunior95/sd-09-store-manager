const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const throwSaleError = require('../utils/throwSaleError');

const create = async (sales) => {
  for (const sale of sales) {
    const result = await productModel.getById(sale.productId);

    if (!result) {
      throwSaleError();
    }
  }

  const newSales = await salesModel.create(sales);

  return newSales;
};

module.exports = {
  create,
};
