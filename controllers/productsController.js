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

const getProducts = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const products = await productsModel.getAllProducts();
    return res.status(DEFAULT_SUCCESS_STATUS).json({ products });
  }
  const product = await productsModel.getProductById(id);
  if (!product) {
    return res.status(ERROR_STATUS).json({ err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    } });
  }
  return res.status(DEFAULT_SUCCESS_STATUS).json(product);
};

module.exports = {
  createProduct,
  getProducts,
};
