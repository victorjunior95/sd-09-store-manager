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
  const newProduct = await ProductModel.create(data);
  return newProduct;
}

async function getAll() {
  const products = await ProductModel.getAll();
  return products;
}

async function getById(id) {
  const idValidation = validateId(id);
  if (idValidation.err) {
    return idValidation;
  }
  const product = await ProductModel.getById(new ObjectId(id));
  if (!product) {
    return {
      err: {
        code: 'not_found',
        message: 'Product not found',
      },
    };
  }
  return product;
}

async function update(id, data) {
  const idValidation = validateId(id);
  if (idValidation.err) {
    return idValidation;
  }
  const updatedProduct = await ProductModel.update(new ObjectId(id), data);
  if (!updatedProduct) {
    return {
      err: {
        code: 'not_found',
        message: 'Product not found',
      },
    };
  }
  return updatedProduct;
}

module.exports = { create, getAll, getById, update };
