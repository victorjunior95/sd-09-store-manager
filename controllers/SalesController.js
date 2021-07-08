const express = require('express');
const {
  validatorIdAndQuantity,
  isValidId,
  validatorId, 
  deleteSale,
  buyProduct} = require('../middlewares/validatorSale');
const SalesService = require('../services/SalesService');
const statusSucess = 200;

const SalesRouter = express.Router();

SalesRouter.get('/', async (_req, res, _next) => {
  const allSales = await SalesService.getAllSales();

  return res.status(statusSucess).json({ sales: allSales });
});

SalesRouter.get('/:id', isValidId, async (req, res, next) => {
  const { id } = req.params;

  const sale = await SalesService.findById(id);

  if (sale.err) return next(sale.err);

  return res.status(statusSucess).json(sale);
});

SalesRouter.post('/', validatorIdAndQuantity, buyProduct, async (req, res, _next) => {
  const { body } = req;

  const productsSale = await SalesService.createSales(body);

  return res.status(statusSucess).json(productsSale);
});

SalesRouter.put('/:id', validatorIdAndQuantity, async (req, res, _next) => {
  const { id } = req.params;
  const { body } = req;

  const newSale = await SalesService.editSale(id, body);

  return res.status(statusSucess).json(newSale);
});

SalesRouter.delete('/:id', validatorId, deleteSale, async (req, res, _next) => {
  const { id } = req.params;

  const deleteProduct = await SalesService.deleteSale(id);

  return res.status(statusSucess).json(deleteProduct);
});

module.exports = SalesRouter;