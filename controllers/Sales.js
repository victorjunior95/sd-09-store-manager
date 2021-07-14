// Req 5
const express = require('express');
const services = require('../services/Sales');

const { status } = require('../schema/status');
const { validateQuantity } = require('../middlewares/SalesValidation');

const routes = express.Router();

routes.post('/', validateQuantity, async (req, res) => {
  const itensSold = req.body;
  const registerSale = await services.register(itensSold);
  return res.status(status.OK).json(registerSale);
});

module.exports = routes;
