const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/producstModel');
const Joi = require('@hapi/joi');
const httpStatusCode = require('../httpStatusCodes');
const ApiError = require('../errors/apiError');

const create = async (products) => {
  products.forEach(({ quantity }) => validateQuantity(quantity));

  products.forEach(({ productId }) => validateProduct(productId));

  return await SalesModel.create(products);
};

const update = async (id, products) => {
  products.forEach(({ quantity }) => validateQuantity(quantity));

  products.forEach(({ productId }) => validateProduct(productId));

  const sale = await SalesModel.update(id, products);

  return sale;
};

const deleteOne = async (id) => {
  const product = await SalesModel.deleteOne(id);

  return product;
};

const findAll = async () => {
  const response = await SalesModel.findAll();

  return response;
};

const findById = async (id) => {
  const response = await SalesModel.findOneById(id);

  if (!response) throw new ApiError(
    'not_found',
    'Sale not found',
    httpStatusCode.notFound,
  );

  return response;
};

const validateProduct = async (productId) => {
  const response = await ProductsModel.findOneById(productId);

  if (!response)
    throw new ApiError(
      'invalid_data',
      'Wrong product ID or invalid quantity',
      httpStatusCode.unprocessableEntity,
    );
};

const validateQuantity = (quantity) => {
  const payloadSchema = Joi.object({
    quantity: Joi.number().integer().min(1).required(),
  });

  const { error } = payloadSchema.validate({ quantity });

  if (error)
    throw new ApiError(
      'invalid_data',
      'Wrong product ID or invalid quantity',
      httpStatusCode.unprocessableEntity,
    );
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteOne,
};
