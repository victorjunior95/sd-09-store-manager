const joi = require('joi');
const { HTTP_INVALID_DATA } = require('../httpResponse');

const checkSalesInput = (req, res, next) => {
  const validInput = joi.array().items({
    productId: joi.string().required(),
    quantity: joi.number().min(1).required() 
  }).validate(req.body);

  if (validInput.error) return res.status(HTTP_INVALID_DATA).send({
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    }
  });

  return next();
};

module.exports = checkSalesInput;