// const Joi = require('@hapi/joi');
const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');

const minLength = 5;

const nameIsValid = (name) => name.length >= minLength;

const nameExists = async (name) => {
  const product = await productsModel.getProductByName(name);

  return product.name ? true : false;
};

const quantityTypeIsValid = (quantity) => typeof quantity === 'number';

const quantityValueIsValid = (quantity) => quantity >= 1;

const idIsValid = (id) => ObjectId.isValid(id) ? true : false;

module.exports = {
  nameIsValid,
  nameExists,
  quantityTypeIsValid,
  quantityValueIsValid,
  idIsValid,
};

// const productSchema = Joi.object({
//   name: Joi.string()
//     .required()
//     .min(minLength)
//     .messages({})
// });
