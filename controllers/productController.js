const productService = require('../services/productService');
const rescue = require('express-rescue');

const productInsert = rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  const success = 200;
  await productService.productCreate(name, quantity);
  console.log(quantity);

  res.status(success).json('produto adicionado');
});

module.exports = {
  productInsert
};