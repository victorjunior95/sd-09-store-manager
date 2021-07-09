const express = require('express');
const salesServices = require('../services/salesServices');
const response = require('../middlewares/responseCodes');

const SalesRouter = express.Router();

SalesRouter.post('/', async (req, res) => {
  const newSale = await salesServices.createNewSale(req.body);
  return res.status(response.STATUS_CREATED).json(newSale);
});

module.exports = SalesRouter;