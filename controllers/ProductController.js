const { Router } = require('express');
const Joi = require('joi');
const ProductService = require('../services/ProductService');

const ProductRouter = Router();

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const STRING_LENGTH = 5;

function validateData(data) {
  const { error } = Joi.object({
    name: Joi.string().not().empty().min(STRING_LENGTH).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(data);
  if (error) {
    return {
      err: {
        code: 'invalid_data',
        message: error.details[0].message,
      },
    };
  }
  return {};
}

ProductRouter.post('/', async (req, res, next) => {
  const productData = req.body;
  const dataValidation = validateData(productData);
  if (dataValidation.err) {
    return next(dataValidation);
  }
  const response = await ProductService.create(productData);
  if (response.err) {
    return next(response);
  }
  return res.status(HTTP_CREATED).json(response);
});

ProductRouter.get('/', async (_req, res) => {
  const products = await ProductService.getAll();
  return res.status(HTTP_OK).json({ products });
});

ProductRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductService.getById(id);
  if (product.err) {
    return next(product);
  }
  return res.status(HTTP_OK).json(product);
});

ProductRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const productData = req.body;
  const dataValidation = validateData(productData);
  if (dataValidation.err) {
    return next(dataValidation);
  }
  const updatedProduct = await ProductService.update(id, productData);
  if (updatedProduct.err) {
    return next(updatedProduct);
  }
  return res.status(HTTP_OK).json(updatedProduct);
});

module.exports = ProductRouter;
