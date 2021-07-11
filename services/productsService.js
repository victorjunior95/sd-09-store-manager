const ProductsModel = require('../models/producstModel');
const Joi = require('@hapi/joi');
const httpStatusCode = require('../httpStatusCodes');
const ApiError = require('../errors/apiError');

const create = async (name, quantity) => {

  validateProduct(name, quantity);

  await validateUniqueProductName(name);

  return await ProductsModel.create({ name, quantity });
};

const update = async(id, name, quantity) => {

  validateProduct(name, quantity);

  const product = await ProductsModel.update(id, { name, quantity });

  return product;
};

const findAll = async () => {
  const response = await ProductsModel.findAll();

  return response;
};

const findById = async (id) => {
  const response = await ProductsModel.findOneById(id);

  return response;
};

const validateUniqueProductName = async (name) => {
  const response = await ProductsModel.findOneByName(name);

  if (response)
    throw new ApiError(
      'invalid_data',
      'Product already exists',
      httpStatusCode.unprocessableEntity,
    );
};

const validateProduct = (name, quantity) => {
  const minNameLength = 5;
  const payloadSchema = Joi.object({
    name: Joi.string().min(minNameLength).required(),
    quantity: Joi.number().integer().min(1).required(),
  });

  const { error } = payloadSchema.validate({ name, quantity });

  if (error)
    throw new ApiError('invalid_data', error.message, httpStatusCode.unprocessableEntity);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};
