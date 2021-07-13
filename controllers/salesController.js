const express = require('express');
const salesService = require('../services/salesService');
const {
  validateSaleData,
  validateSaleId,
} = require('../middlewares/salesMiddleware');
const { route } = require('./productsController');
const router = express.Router();

const responseCode = {
  success: 200,
  created: 201,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
};

router.get('/', async (_req, res) => {
  const salesList = await salesService.getAll();
  res.status(responseCode.success).json(salesList);
});

router.get('/:id', validateSaleId, async(req, res) => {
  const { id } = req.params;
  const sale = await salesService.findById(id);
  res.status(responseCode.success).json(sale);
});

router.post('/', validateSaleData, async(req, res) => {
  const itensSold = req.body;
  const sale = await salesService.createSale(itensSold);
  res.status(responseCode.success).json(sale);
});

module.exports = router;
