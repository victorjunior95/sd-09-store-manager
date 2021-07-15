const { Router } = require('express');
const ProductService = require('../services/ProductService');

const ProductRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;

ProductRouter.post('/', async (req, res, next) => {
  try {
    const productData = req.body;
    const response = await ProductService.create(productData);
    return res.status(HTTP_CREATED).json(response);
  } catch(err) {
    next(err);
  }

});

ProductRouter.get('/', async (_req, res) => {
  const response = await ProductService.getAll();
  return res.status(HTTP_OK).json({ products: response });
});

ProductRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await ProductService.getById(id);
    return res.status(HTTP_OK).json(response);
  } catch(err) {
    next(err);
  }
});

ProductRouter.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const response = await ProductService.updateById(id, productData);
    return res.status(HTTP_OK).json(response);
  } catch(err) {
    next(err);
  }
});

ProductRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await ProductService.deleteById(id);
    return res.status(HTTP_OK).json(response);
  } catch(err) {
    next(err);
  }
});

module.exports = ProductRouter;
