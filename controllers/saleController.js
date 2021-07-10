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

router.get('/', async (req, res) => {
  const sales = await saleService.getAll();

  return res.status(statusSucess).json({ sales });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const sale = await saleService.getById(id);

  if(sale.error) return next(sale);

  res.status(statusSucess).json(sale);
});

router.put('/:id', async (req, res, next) => {

  const product = await saleService.update(req.params.id, req.body);

  if (product.error) return next(product);

  res.status(statusSucess).json(product);
  
});
  
module.exports = router;