const express = require('express');
const salesService = require('../services/salesService');
const {
  validateSaleData,
  validateSaleId,
  validateSaleExists,
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

router.get('/:id', validateSaleId, validateSaleExists, async(req, res) => {
  const { id } = req.params;
  const sale = await salesService.findById(id);
  res.status(responseCode.success).json(sale);
});

router.post('/', validateSaleData, async(req, res) => {
  try {
    const itensSold = req.body;
    const createdSale = await salesService.createSale(itensSold);
    res.status(responseCode.success).json(createdSale);
  } catch (error) {
    res.status(error.responseCode).json('{err: error.err}');
  }
});

router.put('/:id', validateSaleId, validateSaleData, async (req, res) => {
  const { id } = req.params;
  const itemSold = req.body[0];
  const editedSale = await salesService.updateSale(id, itemSold);
  res.status(responseCode.success).json(editedSale);
});

router.delete('/:id', validateSaleExists, async (req, res) => {
  const { id } = req.params;
  const deletedSale = await salesService.deleteSale(id);
  res.status(responseCode.success).json(deletedSale);
});

module.exports = router;
