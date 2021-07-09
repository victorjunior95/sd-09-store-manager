const { Router } = require('express');
const Joi = require('joi');
const ProductService = require('../services/ProductService');

const ProductRouter = Router();

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

module.exports = ProductRouter;