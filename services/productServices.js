const { ObjectId } = require('mongodb');
const Joi = require('joi');

const { 
  createProduct,
  searchProductsByName,
  searchProductsByID,
  updateProducts,
} = require('../models/productsModel');

const minNameSize = 5;
const UnprocessableEntity = 422;
const notFound = 404;
const nameAlreadyInUse = 'Product already exists';
const invalidID = 'Wrong id format';

const productSchema = Joi.object({
  name: Joi.string().min(minNameSize).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validationError = (status, message) => ({
  status,
  message
});

const validateProductObj = async (prodData) => {
  const { error } = productSchema.validate(prodData);

  const [nameNotAvaible] = await searchProductsByName(prodData.name);
  if (nameNotAvaible) throw validationError(UnprocessableEntity, nameAlreadyInUse);

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

const listProductByID = async (prodID) => {
  const validID = ObjectId.isValid(prodID);
  if (!validID) throw validationError(UnprocessableEntity, invalidID);

  const searchedProd = await searchProductsByID(prodID);
  if (!searchedProd[0]) throw validationError(notFound, 'Nothing found!');

  return searchedProd;
};

const updateProductSevice = async (mongoId, prodObj) => {
  const validID = ObjectId.isValid(mongoId);
  const { error } = productSchema.validate(prodObj);
  if (error) {
    const { details: [{ message }] } = error;
    throw validationError(UnprocessableEntity, message);
  }
  if (!validID) throw validationError(UnprocessableEntity, invalidID);

  await updateProducts(mongoId, prodObj);
};

module.exports = {
  createProductService,
  updateProductSevice,
  listProductByID,
};
