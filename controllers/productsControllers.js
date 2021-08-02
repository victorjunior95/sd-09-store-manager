const express = require('express');
const productsServices = require('../services/productsServices');

// const STATUS_OK = 200;
const CREATE_OK = 201;
const UNPROCESSABLE_ENTITY = 422;

async function createProduct(req, res) {
  const { name, quantity } = req.body;
  const newProduct = await productsServices.createProduct(name, quantity);

  if (newProduct.err) {

    return res.status(UNPROCESSABLE_ENTITY).json(newProduct);
  }

  return res.status(CREATE_OK).json(newProduct);
};

module.exports = {
  createProduct,
  // getAllProducts,
};
