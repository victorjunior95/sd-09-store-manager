const Joi = require('joi');
const ProductModel = require('../models/ProductModel');
const { ObjectId } = require('mongodb');

const minLength = 5;

function dataValidation(data) {
  const { error } = Joi.object({
    name: Joi.string().not().empty().min(minLength).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(data);
  if (error) {
    throw ({ code: 'invalid_data', message: error.details[0].message });
  }
}

async function nameValidation(name) {
  const nameExists = await ProductModel.getByName(name);
  if (nameExists) {
    throw ({ code: 'invalid_data', message: 'Product already exists' });
  }
}

function idValidation(id) {
  if (!ObjectId.isValid(id)) {
    throw ({ code: 'invalid_data', message: 'Wrong id format' });
  }
}

async function createData(data) {
  dataValidation(data);
  await nameValidation(data.name);
  const result = await ProductModel.create(data);
  return result;
}

async function getAllData() {
  const result = await ProductModel.getAll();
  return result;
}

async function getDataById(id) {
  idValidation(id);
  const result = await ProductModel.getById(new ObjectId(id));
  if (!result) {
    throw ({ code: 'not_found', message: 'Product not found' });
  }
  return result;
}

async function updateDataById(id, data) {
  idValidation(id);
  dataValidation(data);
  const result = await ProductModel.updateById(new ObjectId(id), data);
  if (!result) {
    throw ({ code: 'not_found', message: 'Product not found' });
  }
  return result;
}

async function deleteDataById(id) {
  idValidation(id);
  const result = await ProductModel.deleteById(new ObjectId(id));
  if (!result) {
    throw ({ code: 'not_found', message: 'Product not found' });
  }
  return result;
}

async function checkDataStock(id, saleQuantity) {
  const { quantity } = await ProductModel.getById(new ObjectId(id));
  if (saleQuantity > quantity) {
    throw ({
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    });
  }
}

async function increaseDataQuantity(id, saleQuantity) {
  const { quantity } = await ProductModel.getById(new ObjectId(id));
  const newQuantity = Number(quantity) + Number(saleQuantity);
  await ProductModel.updateQuantity(new ObjectId(id), newQuantity);
}

async function deacreaseDataQuantity(id, saleQuantity) {
  const { quantity } = await ProductModel.getById(new ObjectId(id));
  const newQuantity = Number(quantity) - Number(saleQuantity);
  await ProductModel.updateQuantity(new ObjectId(id), newQuantity);
}


module.exports = {
  createData,
  getAllData,
  getDataById,
  updateDataById,
  deleteDataById,
  increaseDataQuantity,
  deacreaseDataQuantity,
  checkDataStock,
};