const Joi = require('@hapi/joi');

const validateProduct = (req, _res, next) => {
  const { name, quantity } = req.body;
  const nameMinLength = 5;

  const productSchema = Joi.object({
    name: Joi.string().min(nameMinLength).required(),
    quantity: Joi.number().integer().min(1).required(),
  });

  const productValidation = productSchema.validate({ name, quantity }); 

  if (productValidation.error) {
    return next(productValidation.error);
  };
  
  return next();
};

module.exports = validateProduct;
