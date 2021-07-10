const productService  = require('../services/registerProductService');
const { httpStatusCode: {
  created,
  ok
}} = require('../utils');

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const response = await productService.registerProductService(name, quantity);
    return res.status(created).json(response);
  } catch (error) {
    return next(error);
  }
};

const listAllProducts = async (req, res, next) => {
  try {
    const products = await productService.listaAllProductsService();
    return res.status(ok).json({ products });
  } catch (error) {
    return next(error);
  }
};

const getByIDController = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const response = await productService.getByIDService(id);
    return res.status(ok).json(response);
  } catch (error) {
    return next(error);
  }
  
};

const updateOneProductController = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const productUpdated = await productService
      .updateOneProductService(id, name, quantity);
    return res.status(ok).json(productUpdated);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProduct,
  listAllProducts,
  getByIDController,
  updateOneProductController
};
