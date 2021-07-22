const { createProduct, searchProducts } = require('../models/productsModel');
const Joi = require('joi');

const minNameSize = 5;
const UnprocessableEntity = 422;
const nameAlreadyInUse = 'Product already exists';

const productSchema = Joi.object({
  name: Joi.string().min(minNameSize).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validationError = (status, message) => ({
  status,
  message
});

const validateProductObj = async (prodData) => {
  const nameNotAvaible = await searchProducts(prodData.name);

  if (nameNotAvaible) throw validationError(UnprocessableEntity, nameAlreadyInUse);

  const { error } = productSchema.validate(prodData);

  return error;
};

const createProductService = async (prodObj) => {
  const { name, quantity } = prodObj;
  const validation = await validateProductObj(prodObj);

  if (!validation) {
    const registeredID = await createProduct(name, quantity);

    return  registeredID;
  }

  const { details: [{ message }] } = validation;

  throw validationError(UnprocessableEntity, message);
};

module.exports = createProductService;
