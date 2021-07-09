const productService  = require('../services/registerProductService');
const { httpStatusCode: { created }} = require('../utils');

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const response = await productService.registerProductService(name, quantity);
    return res.status(created).json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = { createProduct };
