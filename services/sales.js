const { sales: salesModel, products: productsModel } = require('../models');
const ajv = require('../schemas/validation');
const { ObjectId } = require('mongodb');
const { AppError, errorCodes } = require('../utils');

ajv.addKeyword('productIdExists', {
  async: true,
  type: 'string',
  validate: productsModel.checkIdExists,
});

// exports.getAllService = async () => {
//   return await salesModel.getAll();
// };

// exports.getByIdService = async (id) => {
//   let sale = null;

//   if (ObjectId.isValid(id)) {
//     sale = await salesModel.getById(id);
//     if (sale === null)
//       throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
//     return sale;
//   } else {
//     throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
//   }
// };

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
