const SalesModel = require('../models/SalesModel');
const ProductsService = require('../services/ProductsService');

const validateQuantities = async (soldItens) => {
  const minimunQuantity = 1;
  const isMinimumQuantity = soldItens.some(({ quantity }) => quantity < minimunQuantity);
  const isQuantityString = soldItens.some(({ quantity }) => Number.isNaN(+quantity));
  if (isMinimumQuantity || isQuantityString) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      },
    };
  }
};

const addSale = async (soldItens) => {
  validateQuantities(soldItens);
  const data = await SalesModel.addSale(soldItens);
  await decreaseQuantities(soldItens);
  return data.ops[0];
};


const getAllSales = async () => {
  const allSales = await SalesModel.getAllSales();
  return allSales;
};

const findById = async (id) => {
  const sale = await SalesModel.findById(id);
  return sale;
};

const editSale = async ({id, itensSold}) => {
  validateQuantities(itensSold);
  const sale = await SalesModel.editSale({id, itensSold});

  return sale;
};
const deleteSale = async (id) => {
  const sale = await SalesModel.deleteSale(id);
  await increaseQuantities();
  return sale;
};

const decreaseQuantities = async (soldItens) => {
  for (const product of soldItens) {
    await ProductsService.decreaseQuantity(product.productId, product.quantity);
  }
};

const increaseQuantities = async (soldItens) =>  {
  for (const product of soldItens) {
    await ProductsService.increaseQuantity(product.productId, product.quantity);
  }
};

module.exports = {
  validateQuantities,
  decreaseQuantities,
  increaseQuantities,
  deleteSale,
  getAllSales,
  findById,
  editSale,
  addSale,
};
