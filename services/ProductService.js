const Joi = require('joi');
const ProductModel = require('../models/ProductModel');
const { ObjectId } = require('mongodb');

const STRING_LENGTH = 5;

function validateData(data) {
  const { error } = Joi.object({
    name: Joi.string().not().empty().min(STRING_LENGTH).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(data);
  if (error) {
    throw ({ code: 'invalid_data', message: error.details[0].message });
  }
}

async function validateNameAvailability(name) {
  const getByNameResp = await ProductModel.getByName(name);
  if (getByNameResp) {
    throw ({ code: 'invalid_data', message: 'Product already exists' });
  }
}

function validateId(id) {
  if (!ObjectId.isValid(id)) {
    throw ({ code: 'invalid_data', message: 'Wrong id format' });
  }
}

async function create(data) {
  validateData(data);
  await validateNameAvailability(data.name);
  const response = await ProductModel.create(data);
  return response;
}

async function getAll() {
  const response = await ProductModel.getAll();
  return response;
}

async function getById(id) {
  validateId(id);
  const response = await ProductModel.getById(new ObjectId(id));
  if (!response) {
    throw ({ code: 'not_found', message: 'Product not found' });
  }
  return response;
}

async function updateById(id, data) {
  validateId(id);
  validateData(data);
  const response = await ProductModel.updateById(new ObjectId(id), data);
  if (!response) {
    throw ({ code: 'not_found', message: 'Product not found' });
  }
  return response;
}

async function deleteById(id) {
  validateId(id);
  const response = await ProductModel.deleteById(new ObjectId(id));
  if (!response) {
    throw ({ code: 'not_found', message: 'Product not found' });
  }
  return response;
}

async function checkStock(id, saleQuantity) {
  const { quantity } = await ProductModel.getById(new ObjectId(id));
  if (saleQuantity > quantity) {
    throw ({
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    });
  }
}

async function increaseQuantity(id, saleQuantity) {
  const { quantity } = await ProductModel.getById(new ObjectId(id));
  const newQuantity = Number(quantity) + Number(saleQuantity);
  await ProductModel.updateQuantity(new ObjectId(id), newQuantity);
}

async function deacreaseQuantity(id, saleQuantity) {
  const { quantity } = await ProductModel.getById(new ObjectId(id));
  const newQuantity = Number(quantity) - Number(saleQuantity);
  await ProductModel.updateQuantity(new ObjectId(id), newQuantity);
}


module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  increaseQuantity,
  deacreaseQuantity,
  checkStock,
};
