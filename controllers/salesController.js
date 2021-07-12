const express = require('express');
const salesServices = require('../services/salesServices');
const response = require('../middlewares/responseCodes');

const SalesRouter = express.Router();

SalesRouter.get('/', async (req, res, next) => {
  const allSales = await salesServices.getAllSales();
  if(allSales.error) return res.status(response.INVALID_DATA).json(allSales);
  return res.status(response.STATUS_OK).json({ sales: allSales });
});

SalesRouter.get('/:id', async (req, res, next) => {
  const searchedId = req.params.id;
  const foundSale = await salesServices.getSaleById(searchedId);
  if(foundSale.err) return res.status(response.INVALID_DATA).json(foundSale);
  return res.status(response.STATUS_OK).json(foundSale);
});

SalesRouter.post('/', async (req, res, next) => {
  try {
    const newSale = await salesServices.createNewSale(req.body);
    if(newSale.err) return res.status(response.INVALID_DATA).json(newSale);
    return res.status(response.STATUS_OK).json(newSale);
  } catch (error) {
    return next(error);
  }
});


module.exports = SalesRouter;