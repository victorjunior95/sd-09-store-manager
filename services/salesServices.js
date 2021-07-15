const Joi = require('joi');
const SaleModel = require('../models/SaleModel');
const ProductModel = require('../models/ProductModel');
const ProductService = require('../services/ProductService');
const { ObjectId } = require('mongodb');

function dataValidation(data) {
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

function idFormatValidation(id) {
  if (!ObjectId.isValid(id)) {
    throw ({ code: 'invalid_data', message: 'Wrong id format' });
  }
}

async function saleValidation(data) {
  for (const { productId } of data) {
    idFormatValidation(productId);
    const result = await ProductModel.getById(new ObjectId(productId));
    if (!result) {
      throw ({
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      });
    }
  }
}

async function createData(data) {
  dataValidation(data);
  await saleValidation(data);
  const result = await SaleModel.create(data);
  for (const { productId, quantity } of data) {
    await ProductService.checkStock(productId, quantity);
    await ProductService.deacreaseQuantity(productId, quantity);
  }
  return result;
}

async function getAllData() {
  const result = await SaleModel.getAll();
  return result;
}

async function getDataById(id) {
  try {
    idFormatValidation(id);
  } catch(err) {
    throw ({ code: 'not_found', message: 'Sale not found' });
  }
  const result = await SaleModel.getById( new ObjectId(id));
  if (!result) {
    throw ({ code: 'not_found', message: 'Sale not found' });
  }
  return result;
}

async function updateDataById(id, data) {
  idFormatValidation(id);
  dataValidation(data);
  saleValidation(data);
  const result = await SaleModel.updateById(new ObjectId(id), data);
  if (!result) {
    throw ({ code: 'not_found', message: 'Sale not found' });
  }
  return result;
}

async function deleteDataById(id) {
  try {
    idFormatValidation(id);
  } catch(err) {
    err.message = 'Wrong sale ID format';
    throw (err);
  }
  const result = await SaleModel.deleteById(new ObjectId(id));
  if (!result) {
    throw ({ code: 'not_found', message: 'Sale not found' });
  }
  for (const { productId, quantity } of result.itensSold) {
    await ProductService.increaseQuantity(productId, quantity);
  }
  return result;
}

module.exports = { createData, getAllData, getDataById, updateDataById, deleteDataById };
