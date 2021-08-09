const { sales: salesModel, products: productsModel } = require('../models');
const ajv = require('../schemas/validation');
const { ObjectId } = require('mongodb');
const { AppError, errorCodes } = require('../utils');

const SALE_NOT_FOUND = 'Sale not found';

ajv.addKeyword('productIdExists', {
  async: true,
  type: 'string',
  validate: productsModel.checkIdExists,
});

exports.getAllService = async () => {
  return await salesModel.getAllSales();
};

exports.getByIdService = async (id) => {
  let sale = null;

  if (ObjectId.isValid(id)) {
    sale = await salesModel.getSaleById(id);
    if (sale === null) throw new AppError(errorCodes.NOT_FOUND, SALE_NOT_FOUND);
    return sale;
  } else {
    throw new AppError(errorCodes.NOT_FOUND, SALE_NOT_FOUND);
  }
};

exports.updateSaleService = async (id, newInfo) => {
  let updatedSale = null;
  const validate = ajv.getSchema('sales');
  const isValid = await validate(newInfo);

  if (ObjectId.isValid(id)) {
    updatedSale = await salesModel.updateSale(id, newInfo);
    if (updatedSale === null)
      throw new AppError(errorCodes.NOT_FOUND, SALE_NOT_FOUND);
    return updatedSale;
  } else {
    throw new AppError(errorCodes.NOT_FOUND, SALE_NOT_FOUND);
  }
};

exports.createService = async (sales) => {
  const validate = ajv.getSchema('sales');
  const isValid = await validate(sales);
  let stock = false;

  for ({ productId, quantity } of sales.itensSold) {
    stock = false;
    const product = await productsModel.getById(productId);
    if (product.quantity >= quantity) {
      stock = true;
      await productsModel.updateProductDecQuantity(productId, quantity);
    }
  };

  if (stock) {
    return await salesModel.createSale(sales);
  } else {
    throw new AppError(
      errorCodes.STOCK_PROBLEM,
      'Such amount is not permitted to sell'
    );
  }
};

exports.deleteSaleService = async (id) => {
  let deletedSale = null;

  if (ObjectId.isValid(id)) {
    deletedSale = await salesModel.deleteSale(id);
    if (deletedSale === null)
      throw new AppError(errorCodes.INVALID_DATA, 'Wrong sale ID format');
    for ({ productId, quantity } of deletedSale.itensSold) {
      await productsModel.updateProductIncQuantity(productId, quantity);
    };
    return deletedSale;
  } else {
    throw new AppError(errorCodes.INVALID_DATA, 'Wrong sale ID format');
  }
};
