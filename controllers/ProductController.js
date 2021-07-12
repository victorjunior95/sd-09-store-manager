const { Router } = require('express');
const ProductService = require('../services/ProductService');

const ProductRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;

ProductRouter.post('/', async (req, res, next) => {
  const productData = req.body;
  const response = await ProductService.create(productData);
  if (response.err) {
    return next(response);
  }
  return res.status(HTTP_CREATED).json(response);
});

ProductRouter.get('/', async (_req, res) => {
  const response = await ProductService.getAll();
  return res.status(HTTP_OK).json({ products: response });
});

ProductRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const response = await ProductService.getById(id);
  if (response.err) {
    return next(response);
  }
  return res.status(HTTP_OK).json(response);
});

ProductRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const productData = req.body;
  const response = await ProductService.updateById(id, productData);
  if (response.err) {
    return next(response);
  }
  return res.status(HTTP_OK).json(response);
});

ProductRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const response = await ProductService.deleteById(id);
  if (response.err) {
    return next(response);
  }
  return res.status(HTTP_OK).json(response);
});

module.exports = ProductRouter;
