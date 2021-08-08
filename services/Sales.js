const Joi = require('@hapi/joi');

const UNAVAIALBLE_REQUISITION = 422;

const validateSales = Joi.array().items({

  productId: Joi.string().required,
  quantity: Joi.number().min(1).required

});

const create = (item) => {
  const { error } = validateSales.validate(item);

  if(error) {
    return {
      status: UNAVAIALBLE_REQUISITION,
      code: 'invalid_data',
      error: {message: 'Wrong product ID or invalid quantity'}
    };   
  }
};

module.exports = {
  create
};