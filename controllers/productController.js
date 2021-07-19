const { productCreate } = require('../services/productService');
const rescue = require('express-rescue');

const errorHandler = (error) => {
  return {
    'err': {
      'code': error.code,
      'message': error.message,
    }
  };
};

const productInsert = rescue(async (req, res, _next) => {
  const productData = req.body;
  const success = 201;
  const result = await productCreate(productData);
  if (result.status) {
    const err = errorHandler(result);
    return res.status(result.status).json(err);
  }
  return res.status(success).json(result);
});

const listProducts = rescue(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const details = await productDetails(id);
  }
  const list = await listProducts();
});

module.exports = {
  productInsert,
};