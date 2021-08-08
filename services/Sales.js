const Joi = require('@hapi/joi');

const UNAVAIALBLE_REQUISITION = 422;

const schema = Joi.array().items({

  productId: Joi.string().required,
  quantity: Joi.number().min(1).required

});

const create = (item) => {
  const { error } = schema.validate(item);

  if(error) {
    throw {
      err: {
        code: 'invalid_data',
        error: {message: 'Wrong product ID or invalid quantity'}
      },
      status: UNAVAIALBLE_REQUISITION,
      
    };   
  }
};

module.exports = {
  create
};