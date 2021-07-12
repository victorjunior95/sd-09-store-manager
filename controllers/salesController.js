const express = require('express');
const salesService = require('../services/salesService');
const SalesRouter = express.Router();

const HTTP_SERVERERROR_STATUS = 500;

SalesRouter.post('/', async (req, res, _next ) => {
  try {
    const sale = await salesService.create(req.body);
    if (sale.err)
      return res.status(sale.status).json({ err: sale.err });

    return res.status(sale.status).json(sale.soldsCreate);
  } catch (error) {
    return res.status(HTTP_SERVERERROR_STATUS).json(err);
  }
});

SalesRouter.get('/', async (_req, res, _next) => {
  try {
    const salesResult = await salesService.listAll();
    return res.status(salesResult.status).json({sales: salesResult.sales });
  } catch (error) {
    return res.status(HTTP_SERVERERROR_STATUS).json(error);
  }
});

SalesRouter.get('/:id', async (req, res, _next) => {
  try {
    const { id } = req.params;
    const saleResult = await salesService.listById(id);
    if ( saleResult.err) {
      return res.status(saleResult.status).json({ err: saleResult.err });
    }
    return res.status(saleResult.status).json(saleResult.sale);
  } catch (error) {
    res.status(HTTP_SERVERERROR_STATUS).json(error);
  }
});

SalesRouter.put('/:id', async (req, res, _next) => {
  try {
    const { id } = req.params;
    const soldUpdate = await salesService.update(id, req.body);
    
    if (soldUpdate.err) {
      res.status(soldUpdate.status).json({ err: soldUpdate.err });
    }
    return res.status(soldUpdate.status).json(soldUpdate.soldUpdate);

  } catch (error) {
    return res.status(HTTP_SERVERERROR_STATUS).json(error);
  }
});

module.exports = SalesRouter;