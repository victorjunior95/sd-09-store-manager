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
    return res.status(HTTP_SERVERERROR_STATUS).json(error);
    
  }
});

module.exports = SalesRouter;