const Joi = require('@hapi/joi');
const { 
  registerProductModel,
  existsProduct,
  listaAllProductsModel,
  getByID,
  updateOneProductModel,
  deleteOneProduct
} = require('../models/productsModel');

const { 
  invalidProduct,
  alreadyExists
} = require('../dictionary/dictionaryError');
const { httpStatusCode: { unprocessableEntity } } = require('../utils');

const minLength = 5;
const minQuantity = 1;

const productSchema = Joi.object({
  name: Joi.string()
    .min(minLength)
    .required(),

  quantity: Joi.number()
    .integer()
    .min(minQuantity)
    .required()
});

const registerProductService = async (name, quantity) => {
  const { error } = productSchema
    .validate({name, quantity});
  if (error) throw invalidProduct(unprocessableEntity, 'invalid_data', error.message);
  
  if (await existsProduct(name)) throw alreadyExists();

  const response = await registerProductModel(name, quantity);
  return response;
};

const listaAllProductsService = async () => await listaAllProductsModel();

const getByIDService = async (id) => {
  const response = await getByID(id);
  if (response === null) throw {
    status: unprocessableEntity,
    message: 'Wrong id format',
    code: 'invalid_data'
  };

  return response;
};

const updateOneProductService = async (id, name, quantity) => {
  const { error } = productSchema
    .validate({name, quantity});
  if (error) throw invalidProduct(unprocessableEntity, 'invalid_data', error.message);

  const productUpdated = await updateOneProductModel(id, name, quantity);
  // if (!productUpdated) lança um error aqui mas qual?
  
  const response = await getByID(id);
  return response;
};

const deleteOneProductService = async (id) => {
  const response = await getByID(id);
  const isDeleted = await deleteOneProduct(id);

  if (!isDeleted) throw {
    status: unprocessableEntity,
    message: 'Wrong id format',
    code: 'invalid_data'
  };

  return response;
};

module.exports = {
  registerProductService,
  listaAllProductsService,
  getByIDService,
  updateOneProductService,
  deleteOneProductService
};
