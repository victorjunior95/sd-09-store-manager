// const { ObjectId } = require('mongodb');
// const salesModel = require('../models/salesModel');

const minQuantity = 0;

const quantityValueIsValid = (quantity) => quantity > minQuantity;

const quantityTypeIsValid = (quantity) => typeof quantity === 'number';

module.exports = {
  quantityValueIsValid,
  quantityTypeIsValid
};
