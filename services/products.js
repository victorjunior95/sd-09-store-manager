const Products = require('../models/products');
const Joi = require('@hapi/joi');
const { MIN_STRING, MIN_NUMBER } = require('../constants/magicNumbers.json');

const create = async (product) => {

  const { error } = Joi.object({
    name: Joi.string().not().empty().min(MIN_STRING).required(),
    quantity: Joi.number().not().empty().min(MIN_NUMBER).required(),
  }).validate(product, { convert: false });

  if (error) return {
    err: { code: 'invalid_data', message: error.message }
  };

  const existingProduct = await Products.findByName(product.name);

  if (existingProduct) return {
    err: { code: 'invalid_data', message: 'Product already exists' }
  };

  const { insertedId } = await Products.create(product.name, product.quantity);
  return insertedId;
};

const getAll = async () => {

  const products = await Products.getAll();

  return products;
};

const findById = async (id) => {

  if (!id) {
    return await Products.getAll();
  }

  const product = await Products.findById(id);

  return product;

};

module.exports = {
  create,
  getAll,
  findById,
};
