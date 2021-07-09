const ProductsModel = require('../models/producstModel');
const httpStatusCode = require('../httpStatusCodes');
const ApiError = require('../errors/apiError');
const Joi = require('joi');


const create = async ({ name, quantity }) => {

  validateCreatePayload({name, quantity});

  validateUniqueProductName(name);

  return ProductsModel.create({name, quantity});

};

const validateCreatePayload = (payload) => {
  const minNameLenght = 5;

  const payloadSchema = Joi.object({
    name: Joi.string()
      .min(minNameLenght)
      .required(),
    quantity: Joi.number()
      .integer()
      .positive()
      .required()
  });

  Joi.assert(payload, payloadSchema,
    {message: '"name" lenght must be at least 5 characters long'});
};



const validateUniqueProductName = async (name) => {
  const response = await ProductsModel.findOneByName(name);

  if (!response) return;

  throw new ApiError('invalid_data', 'Product already exists',
    httpStatusCode.unprocessableEntity);
};

module.exports = {
  create,
};
