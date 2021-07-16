const express = require('express');
const {
  addNewSalesService, findByIdService, getAllService, updateSaleService
} = require('../services/SalesService');

const SalesRouter = express.Router();
const numberStatusOk = 200;
const numberStatusErr = 422;

const objErrorToReturn = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const objNotFound = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};


SalesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const numberErr404 = 404;
  const sale = await findByIdService(id);
  if(!sale) return res.status(numberErr404).json(objNotFound);

  return res.status(numberStatusOk).json(sale);
});

SalesRouter.get('/', async (_req, res) => {

  const sales = await getAllService();
  return res.status(numberStatusOk).json({ sales });
});


SalesRouter.post('/', async (req, res) => {
  const allNewSales = req.body;
  try{
    const newSales = await addNewSalesService(allNewSales);
    return res.status(numberStatusOk).json(newSales);
  } catch (err) {
    return res.status(numberStatusErr).json(objErrorToReturn);
  }
});

SalesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { productId , quantity } = req.body[0];

  const saleUpdate = await updateSaleService(id, quantity);

  if(!saleUpdate) return res.status(numberStatusErr).json(objErrorToReturn);

  const itensSold = [
    {
      productId,
      quantity
    }
  ];
  return res.status(numberStatusOk).json({_id: id, itensSold });
});




module.exports = SalesRouter;
