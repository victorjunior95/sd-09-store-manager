const Joi = require('@hapi/joi');
const { ObjectID } = require('mongodb');
const {
  createSaleModel,
  readSaleByIdModel,
  readAllSalesModel,
  updateSaleModel,
  deleteSaleModel
} = require('../models/salesModel');

const { getByID } = require('../models/productsModel');

const { httpStatusCode: {
  unprocessableEntity,
  notFound
} } = require('../utils');
const minQuantity = 1;

const saleSchema = Joi.object({
  quantity: Joi.number()
    .integer()
    .min(minQuantity)
    .required()
});

const createSaleService = async (salesToVerify) => {
  salesToVerify.forEach(element => {
    const { error } = saleSchema.validate({quantity: element.quantity});
    const isValidId = ObjectID.isValid(element.productId);
    if (error || !isValidId) throw {
      status: unprocessableEntity,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    };
  });

  // const listaDePromisses = salesToVerify.map(({ productId }) => getByID(productId));
  // const promisseAll = Promise.all(listaDePromisses);

  const insertedSales = await createSaleModel(salesToVerify);
  return insertedSales;
};

const readSaleByIdService = async (id) => {
  const saleFound = await readSaleByIdModel(id);
  if (!saleFound) throw {
    status:  notFound,
    message: 'Sale not found',
    code: 'not_found'
  };
  return saleFound;
};

const readAllSalesService = async () => {
  const allSales = await readAllSalesModel();
  if (!allSales) throw { status:  notFound, message: 'Sale not found', code: 'not_found'};
  return allSales;
};

const updateSaleService = async (id, productId, quantity) => {
  const { error } = saleSchema.validate({ quantity });
  if (error) throw {
    status: unprocessableEntity,
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  };

  const updatedSale = await updateSaleModel(id, productId, quantity);
  const response = await readSaleByIdModel(id);
  
  return response;
};

const deleteSaleService = async (id) => {
  const response = await readSaleByIdModel(id);
  const isDeleted = await deleteSaleModel(id);

  if (!isDeleted || !response) throw {
    status: unprocessableEntity,
    code: 'invalid_data',
    message: 'Wrong sale ID format'
  };

  return response;
};


module.exports = {
  createSaleService,
  readSaleByIdService,
  readAllSalesService,
  updateSaleService,
  deleteSaleService
};
