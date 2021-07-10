const ProductModel = require('../models/ProductModel');
const { ObjectId } = require('mongodb'); 

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

function validateId(id) {
  if (!ObjectId.isValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return {};
}

async function create(data) {
  const dataValidation = await validateNameAvailability(data.name);
  if (dataValidation.err) {
    return dataValidation;
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

module.exports = { create, getAll, getById, updateById, deleteById };
