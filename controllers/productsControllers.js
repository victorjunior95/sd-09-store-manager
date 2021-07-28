const express = require('express');
const productsServices = require('../services/productsServices');

// const ProductsRouter = express.Router();

const CREATE_OK = 201;
// const STATUS_OK = 200;
const MIN_CHARACTERS_NAME = 5;
const UNPROCESSABLE_ENTITY = 422;
const MIN_PRODUCT_AMOUNT = 0;

async function createProduct(req, res) {
  const { name, quantity } = req.body;
  
  if (name.length < MIN_CHARACTERS_NAME) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  if (quantity <= MIN_PRODUCT_AMOUNT) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (productsServices.existingProduct(name)) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    });
  }

  if (quantity !== Number ) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  const newProduct = await productsServices.createProduct(name, quantity);
  return res.status(CREATE_OK).json(newProduct);
};

/* async function getAllProducts(_req, res) {
  const products = await productsModels.getAll();

  return res.status(CREATE_OK).json(products);
} */
module.exports = {
  createProduct,
  // getAllProducts,
};
