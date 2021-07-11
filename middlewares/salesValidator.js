const Joi = require('@hapi/joi');
const throwSaleError = require('../utils/throwSaleError');

const validateSales = (req, _res, next) => {
  const sales = req.body;

  const saleSchema = Joi.array().items(Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
  }));

  const saleValidation = saleSchema.validate(sales); 

  if (saleValidation.error) {
    throwSaleError();
  };
  
  return next();
};

module.exports = validateSales;