const Joi = require('joi');
const ProductModel = require('../models/ProductModel');
const { validateId, ObjectId } = require('./validateId');

const STRING_LENGTH = 5;

function validateData(data) {
  const { error } = Joi.object({
    name: Joi.string().not().empty().min(STRING_LENGTH).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(data);
  if (error) {
    return {
      err: {
        code: 'invalid_data',
        message: error.details[0].message,
      },
    };
  }
  return {};
}

async function validateNameAvailability(name) {
  const getByNameResp = await ProductModel.getByName(name);
  if (getByNameResp) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return {};
}

async function create(data) {
  const dataValidation = validateData(data);
  if (dataValidation.err) {
    return dataValidation;
  }
  const nameValidation = await validateNameAvailability(data.name);
  if (nameValidation.err) {
    return nameValidation;
  }
  const response = await ProductModel.create(data);
  return response;
}

async function getAll() {
  const response = await ProductModel.getAll();
  return response;
}

async function getById(id) {
  const idValidation = validateId(id);
  if (idValidation.err) {
    return idValidation;
  }
  const response = await ProductModel.getById(new ObjectId(id));
  if (!response) {
    return {
      err: {
        code: 'not_found',
        message: 'Product not found',
      },
    };
  }
  return response;
}

async function updateById(id, data) {
  const idValidation = validateId(id);
  if (idValidation.err) {
    return idValidation;
  }
  const dataValidation = validateData(data);
  if (dataValidation.err) {
    return dataValidation;
  }
  const response = await ProductModel.updateById(new ObjectId(id), data);
  if (!response) {
    return {
      err: {
        code: 'not_found',
        message: 'Product not found',
      },
    };
  }
  return response;
}

async function deleteById(id) {
  const idValidation = validateId(id);
  if (idValidation.err) {
    return idValidation;
  }
  const response = await ProductModel.deleteById(new ObjectId(id));
  if (!response) {
    return {
      err: {
        code: 'not_found',
        message: 'Product not found',
      },
    };
  }
  return response;
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
};
