const { productCreate } = require('../services/productService');
const rescue = require('express-rescue');

const productInsert = rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  const success = 200;
  const result = await productCreate(name, quantity);
  return res.status(success).json(result);
});

module.exports = {
  productInsert
};