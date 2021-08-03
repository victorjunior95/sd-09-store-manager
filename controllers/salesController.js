const salesService = require('../services/salesService');
const { ObjectId } = require('mongodb');
const STATUS_OK = 200;
const CREATE_OK = 201;
const UNPROCESSABLE_ENTITY = 422;

async function registerSales(req, res) {
  const {productId, quantity}= req.body;
  const newSales = await salesService.registerSales(productId, quantity);

  if (newSales.err) {
    return res.status(UNPROCESSABLE_ENTITY).json(newSales);
  }

  return res.status(STATUS_OK).json(newSales);
};

module.exports = {
  registerSales,
};
