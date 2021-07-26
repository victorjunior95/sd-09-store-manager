const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { createSale } = require('../models/salesModel');
const { listAllProducts } = require('../models/productsModel');

const unprocessableEntity = 422;
const notFound = 404;
const nameAlreadyInUse = 'Product already exists';
const invalidID = 'Wrong id format';

const saleSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validationError = (status, message) => ({
  status,
  message
});

const validateSaleArraySchema = (soldItens) => {
  const validationOfSchema = soldItens.map((i) => saleSchema.validate(i));
  const anyErrors = validationOfSchema.find((i) => i.error ? i.error : null);

  return anyErrors;
};

const validateExistence = async (soldItens) => {
  const prodIds = soldItens.map((i) => i.productId);
  const listOfProducts = await listAllProducts();
  const allProductsIds = listOfProducts.map((i) => String(i._id));
  const match = prodIds.map((i) => allProductsIds.includes(i));
  const avaliation = match.some((i) => i !== true);

  return avaliation;
};

const createSaleService = async (soldItens) => {
  const validationResult = validateSaleArraySchema(soldItens);
  const anyInvalidProduct = await validateExistence(soldItens);

  if (validationResult || anyInvalidProduct) {
    throw validationError(unprocessableEntity, 'Wrong product ID or invalid quantity');
  }

  const newSale = await createSale(soldItens);

  return newSale.ops;
};

module.exports = {
  createSaleService
};
