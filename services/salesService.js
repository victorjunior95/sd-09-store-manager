const Joi = require('@hapi/joi');
const { ObjectID } = require('mongodb');
const { createSaleModel } = require('../models/salesModel');
const { getByID } = require('../models/productsModel');
const { httpStatusCode: { unprocessableEntity } } = require('../utils');
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


module.exports = {
  createSaleService
};
