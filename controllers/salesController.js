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
  if(foundSale.err) return res.status(response.NOT_FOUND).json(foundSale);
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

// SalesRouter.put('/:id',
//   async (req, res, next) => {
//     try {
//       const { name, quantity } = req.body;
//       const id = req.params.id;
//       const updatedProduct = await productsServices.updateProduct(name, quantity, id);
//       return res.status(response.STATUS_OK).json(updatedProduct);
//     } catch (error) {
//       return next(error);
//     }
//   });

SalesRouter.delete('/:id',
  async (req, res) => {
    const id = req.params.id;
    const deletedSale = await salesServices.deleteSale(id);
    if(deletedSale.err) return res.status(response.INVALID_DATA).json(deletedSale);
    return res.status(response.STATUS_OK).json(deletedSale);
  });


module.exports = SalesRouter;