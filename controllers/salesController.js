const express = require('express');
const rescue = require('express-rescue');
const router = express.Router();

const serviceSales = require('../services/salesService');

const { validateId } = require('../schemas/salesSchema');
const { validateSales, validateSalesId } = require('../middlewares/salesMiddleware');
const error = require('../schemas/errorsSchema');

router.get('/', rescue(async (_req, res) => {
  const sales  = await serviceSales.getAllSales();
  
  if(!sales) return res.status(error.NOT_FOUND).send({ message: 'Not found' });

  return res.status(error.OK).send(sales);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const { message } = validateId(id);

  if (message) return res.status(error.NOT_FOUND).json({
    err: { 
      code: 'not_found',
      message: 'Sale not found'
    }
  });

  const sales = await serviceSales.getSalesById(id);

  if (!sales) return res.status(error.NOT_FOUND).json({
    err: { 
      code: 'not_found',
      message: 'Sale not found'
    }
  });

  return res.status(error.OK).send(sales);
}));

router.delete('/:id', validateSalesId, rescue(async (req, res) => {
  const { id } = req.params;
  
  const saleToDelete = await serviceSales.getSalesById(id);
  const { itensSold } = saleToDelete;
  await serviceSales.deleteSalesById(id, itensSold);
 
  return res.status(error.OK).send(saleToDelete);
}));

router.post('/', validateSales, rescue(async (req, res) => {
  const sales = req.body;
  const { err, _id, itensSold } = await serviceSales.createSales(sales);

  if (!err) return res.status(error.OK).send({ _id, itensSold });

  switch (err.code) {
  case 'invalid_data':
    return res.status(error.UNPROCESSABLE_ENTITY).send({ err });
  case 'stock_problem':
    return res.status(error.NOT_FOUND).send({ err });
  };

  // if(err) return res.status(error.UNPROCESSABLE_ENTITY).send({ err });

  // return res.status(error.OK).send({ _id, itensSold });
}));

router.put('/:id', validateSales, validateSalesId, rescue(async (req, res) => {
  const { id } = req.params;
  const { body: itensSold } = req;

  await serviceSales.updateSalesById(id, itensSold);

  const sales = await serviceSales.getSalesById(id);

  return res.status(error.OK).send(sales);
}));

module.exports = router;
