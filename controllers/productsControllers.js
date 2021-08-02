const express = require('express');
const productsServices = require('../services/productsServices');

const STATUS_OK = 200;
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

async function getAllProducts(_req, res) {
  const allProducts = await productsServices.getAllProducts();
  
  return res.status(STATUS_OK).json(allProducts);
};

async function getProductId(req, res) {
  const { id } = req.params;
  const productId = await productsServices.getProductId(id);
  
  if (productId.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(productId);
  }

  return res.status(STATUS_OK).json(productId);
};

async function productUpdate(req, res) {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const newUpdateProduct = await productsServices.productUpdate(id, name, quantity);

  if (newUpdateProduct.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(newUpdateProduct);
  }

  return res.status(STATUS_OK).json(newUpdateProduct);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductId,
  productUpdate
};
