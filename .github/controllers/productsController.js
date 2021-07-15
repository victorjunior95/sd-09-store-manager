const { Router } = require('express');
const ProductService = require('../services/productsServices');

const ProductRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;

ProductRouter.post('/', async (req, res, next) => {
  try {
    const dataBody = req.body;
    const result = await ProductService.create(dataBody);
    return res.status(HTTP_CREATED).json(result);
  } catch(err) {
    next(err);
  }

});

ProductRouter.get('/', async (_req, res) => {
  const result = await ProductService.getAll();
  return res.status(HTTP_OK).json({ products: result });
});

ProductRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ProductService.getById(id);
    return res.status(HTTP_OK).json(result);
  } catch(err) {
    next(err);
  }
});

ProductRouter.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataBody = req.body;
    const result = await ProductService.updateById(id, dataBody);
    return res.status(HTTP_OK).json(result);
  } catch(err) {
    next(err);
  }
});

ProductRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ProductService.deleteById(id);
    return res.status(HTTP_OK).json(result);
  } catch(err) {
    next(err);
  }
});

module.exports = ProductRouter;
