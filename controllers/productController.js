const rescue = require('express-rescue');
const productService = require ('../services/productService');

const STATUS_OK = 200;

const createProduct = rescue(async (req, res, next) =>{
  const { name, quantity } = req.body;
  const objProduct = { name, quantity };

  const result = await productService.createProduct(objProduct);
  if(result.error) return res.status(result.status).json({ message: result.message});

  return rest.status(STATUS_OK).json({products: result});

});

module.exports = {
  createProduct
};