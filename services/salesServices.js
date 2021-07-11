const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const throwSaleError = require('../utils/throwSaleError');

const findAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const sales = await salesModel.getById(id);

  return sales;
};

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
  findAll,
  findById,
  create,
};
