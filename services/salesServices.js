const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { listAllProducts } = require('../models/productsModel');
const {
  createSale,
  searchSaleByID,
  updateSale,
  deleteSale
} = require('../models/salesModel');

const unprocessableEntity = 422;
const notFound = 404;
const invalidIDOrQuantity = 'Wrong product ID or invalid quantity';
const invalidSaleId = 'Wrong sale ID format';

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
    throw validationError(unprocessableEntity, invalidIDOrQuantity);
  }

  const newSale = await createSale(soldItens);

  return newSale.ops;
};

const listSaleByIdService = async (saleID) => {
  const validID = ObjectId.isValid(saleID);
  if (!validID) throw validationError(notFound, 'Sale not found');

  const searchedProd = await searchSaleByID(saleID);
  if (!searchedProd[0]) throw validationError(notFound, 'Sale not found');

  return searchedProd;
};

const updateSaleService = async (mongoId, soldItens) => {
  const validID = ObjectId.isValid(mongoId);
  const validationResult = validateSaleArraySchema(soldItens);
  const anyInvalidProduct = await validateExistence(soldItens);

  if (!validID || validationResult || anyInvalidProduct) {
    throw validationError(unprocessableEntity, invalidIDOrQuantity);
  }

  await updateSale(mongoId, soldItens);
};

const deleteSaleService = async (saleId) => {
  try {
    const saleData = await listSaleByIdService(saleId);
    
    await deleteSale(saleId);
    return saleData;
  } catch (err) {
    throw validationError(unprocessableEntity, invalidSaleId);
  }
};

module.exports = {
  createSaleService,
  listSaleByIdService,
  updateSaleService,
  deleteSaleService,
};
