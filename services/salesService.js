const salesModel = require('../models/salesModel');
const { salesValidator } = require('./validators');

const create = async (productsArray) => {

  if (await salesValidator(productsArray))
    return salesValidator(productsArray);

  return salesModel.create(productsArray)
};

module.exports = {
  create,
};
