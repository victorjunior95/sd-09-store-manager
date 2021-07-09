const saleService = require('../services/saleService');
const express = require('express');
const router = express.Router();

const statusSucessCreate = 201;
const statusSucess = 200;

router.post('/', async (req, res, next) => {
  
  const sale = await saleService.create(req.body);
  
  if (sale.error) return next(sale);
  
  res.status(statusSucess).json(sale);
  
});
  
module.exports = router;