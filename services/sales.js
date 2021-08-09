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
    if (sale === null)
      throw new AppError(errorCodes.NOT_FOUND, SALE_NOT_FOUND);
    return sale;
  } else {
    throw new AppError(errorCodes.NOT_FOUND, SALE_NOT_FOUND);
  }
};

// exports.updateSaleService = async (id, newInfo) => {
//   let updatedSale = null;
//   const validate = ajv.getSchema('salesUpdate');
//   const isValid = await validate(newInfo);

//   if (ObjectId.isValid(id) && isValid) {
//     updatedSale = await salesModel.updateSale(id, newInfo);
//     if (updatedSale === null)
//       throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
//     return updatedSale;
//   } else if (!ObjectId.isValid(id)) {
//     throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
//   } else {
//     throw new AppError(errorCodes.INVALID_DATA, validate.errors[0].message);
//   }
// };

exports.createService = async (sales) => {
  const validate = ajv.getSchema('sales');
  const isValid = await validate(sales);
  return await salesModel.createSale(sales);
};

// exports.deleteSaleService = async (id) => {
//   let sale = null;

//   if (ObjectId.isValid(id)) {
//     deletedSale = await salesModel.deleteSale(id);
//     if (deletedSale === null)
//       throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
//     return deletedSale;
//   } else {
//     throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
//   }
// };
