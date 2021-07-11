const productsServices = require('../services/productsServices');
const productsModel = require('../models/productsModel');

const DEFAULT_SUCCESS_STATUS = 200;
const CREATE_SUCCESS_STATUS = 201;
const ERROR_STATUS = 422;

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await productsServices.createProduct(name, quantity);
  if (newProduct.err) return res.status(ERROR_STATUS).json(newProduct);
  return res.status(CREATE_SUCCESS_STATUS).json(newProduct);
};

module.exports = {
  createProduct,
};
