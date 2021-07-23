const productsService = require('../services/Products');
const rescue = require('express-rescue');

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productsService.create(name, quantity);
  res.status(response.code).json(response.result);
});



module.exports = { create };