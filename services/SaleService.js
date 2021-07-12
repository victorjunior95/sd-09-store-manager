const Joi = require('joi');
const SaleModel = require('../models/SaleModel');
const ProductModel = require('../models/ProductModel');
const { validateId, ObjectId } = require('./validateId');

function validateData(data) {
  const { error } = Joi.array().items(
    Joi.object({
      productId: Joi.string().not().empty().required(),
      quantity: Joi.number().integer().min(1).required(),
    })
  ).validate(data);
  if (error) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  return {};
}

function validateSaleProductId(salesData) {
  let err = {};
  salesData.forEach(async ({ productId }) => {
    const idValidation = validateId(productId);
    if (idValidation.err) {
      err = idValidation;
    }
    const response = await ProductModel.getById(new ObjectId(productId));
    console.log(response);
    if (!response) {
      err = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }
  });
  return err;
}

async function create(salesData) {
  const dataValidation = validateData(salesData);
  if (dataValidation.err) {
    return dataValidation;
  }
  const idValidation = validateSaleProductId(salesData);
  if (idValidation.err) {
    return idValidation;
  }
  const response = await SaleModel.create(salesData);
  return response;
}

module.exports = { create };
