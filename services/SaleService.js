const Joi = require('joi');
const SaleModel = require('../models/SaleModel');
const ProductModel = require('../models/ProductModel');
const ProductService = require('../services/ProductService');
const { ObjectId } = require('mongodb');

function validateData(data) {
  const { error } = Joi.array().items(
    Joi.object({
      productId: Joi.string().not().empty().required(),
      quantity: Joi.number().integer().min(1).required(),
    })
  ).validate(data);
  if (error) {
    throw ({ code: 'invalid_data', message: 'Wrong product ID or invalid quantity' });
  }
}

function validateId(id) {
  if (!ObjectId.isValid(id)) {
    throw ({ code: 'invalid_data', message: 'Wrong id format' });
  }
}

async function validateSaleProductId(salesData) {
  for (const { productId } of salesData) {
    validateId(productId);
    const response = await ProductModel.getById(new ObjectId(productId));
    if (!response) {
      throw ({
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      });
    }
  }
}

async function create(salesData) {
  validateData(salesData);
  await validateSaleProductId(salesData);
  const response = await SaleModel.create(salesData);
  for (const { productId, quantity } of salesData) {
    await ProductService.checkStock(productId, quantity);
    await ProductService.deacreaseQuantity(productId, quantity);
  }
  return response;
}

async function getAll() {
  const response = await SaleModel.getAll();
  return response;
}

async function getById(id) {
  try {
    validateId(id);
  } catch(err) {
    throw ({ code: 'not_found', message: 'Sale not found' });
  }
  const response = await SaleModel.getById( new ObjectId(id));
  if (!response) {
    throw ({ code: 'not_found', message: 'Sale not found' });
  }
  return response;
}

async function updateById(id, salesData) {
  validateId(id);
  validateData(salesData);
  validateSaleProductId(salesData);
  const response = await SaleModel.updateById(new ObjectId(id), salesData);
  if (!response) {
    throw ({ code: 'not_found', message: 'Sale not found' });
  }
  return response;
}

async function deleteById(id) {
  try {
    validateId(id);
  } catch(err) {
    err.message = 'Wrong sale ID format';
    throw (err);
  }
  const response = await SaleModel.deleteById(new ObjectId(id));
  if (!response) {
    throw ({ code: 'not_found', message: 'Sale not found' });
  }
  for (const { productId, quantity } of response.itensSold) {
    await ProductService.increaseQuantity(productId, quantity);
  }
  return response;
}

module.exports = { create, getAll, getById, updateById, deleteById };
