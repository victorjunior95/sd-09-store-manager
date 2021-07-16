const express = require('express');
const {
  addNewSalesService, findByIdService
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

// SalesRouter.get('/', async (_req, res) => {

//   const sales = await getAllService();
//   return res.status(numberStatusOk).json({ sales });
// });

// SalesRouter.get('/:id', async (req, res) => {
//   const { id } = req.params;

//   const product = await findByIdService(id);
//   if(product.err) return res.status(numberStatusErr).json(product);

//   return res.status(numberStatusOk).json(product);
// });


SalesRouter.post('/', async (req, res) => {
  const allSales = req.body;
  try{
    const newSales = await addNewSalesService(allSales);
    return res.status(numberStatusOk).json(newSales);
  } catch (err) {
    return res.status(numberStatusErr).json(objErrorToReturn);
  }
});




module.exports = SalesRouter;
