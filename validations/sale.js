const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const minQuantity = 0;

const quantityValueIsValid = (quantity) => quantity > minQuantity;

const quantityTypeIsValid = (quantity) => typeof quantity === 'number';

const idIsValid = (id) => ObjectId.isValid(id) ? true : false;

module.exports = {
  quantityValueIsValid,
  quantityTypeIsValid,
  idIsValid,
};
