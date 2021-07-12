const Joi = require('joi');
const SaleModel = require('../models/SaleModel');
const ProductModel = require('../models/ProductModel');
const ProductService = require('../services/ProductService');
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

async function validateSaleProductId(salesData) {
  let err = {};
  for (const { productId } of salesData) {
    const idValidation = validateId(productId);
    if (idValidation.err) {
      err = idValidation;
    }
    const response = await ProductModel.getById(new ObjectId(productId));
    if (!response) {
      err = {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }
  }
  return err;
}

async function create(salesData) {
  const dataValidation = validateData(salesData);
  if (dataValidation.err) {
    return dataValidation;
  }
  const idValidation = await validateSaleProductId(salesData);
  if (idValidation.err) {
    return idValidation;
  }
  const response = await SaleModel.create(salesData);
  for (const { productId, quantity } of salesData) {
    await ProductService.deacreaseQuantity(productId, quantity);
  }
  return response;
}

async function getAll() {
  const response = await SaleModel.getAll();
  return response;
}

async function getById(id) {
  const idValidation = validateId(id);
  if (idValidation.err) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  const response = await SaleModel.getById( new ObjectId(id));
  if (!response) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return response;
}

async function updateById(id, salesData) {
  const idValidation = validateId(id);
  if (idValidation.err) {
    return idValidation;
  }
  const dataValidation = validateData(salesData);
  if (dataValidation.err) {
    return dataValidation;
  }
  const productIdValidation = validateSaleProductId(salesData);
  if (productIdValidation.err) {
    return productIdValidation;
  }
  const response = await SaleModel.updateById(new ObjectId(id), salesData);
  if (!response) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  return response;
}

async function deleteById(id) {
  const idValidation = validateId(id);
  if (idValidation.err) {
    idValidation.err.message = 'Wrong sale ID format';
    return idValidation;
  }
  const response = await SaleModel.deleteById(new ObjectId(id));
  if (!response) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
  for (const { productId, quantity } of response.itensSold) {
    await ProductService.increaseQuantity(productId, quantity);
  }
  return response;
}

module.exports = { create, getAll, getById, updateById, deleteById };
