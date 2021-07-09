const ProductsModel = require('../models/producstModel');
const httpStatusCode = require('../httpStatusCodes');
const ApiError = require('../errors/apiError');


const create = async ({ name, quantity }) => {

  validateUniqueProductName(name);

  return ProductsModel.create({name, quantity});

};

const validateUniqueProductName = async (name) => {
  const response = await ProductsModel.findOneByName(name);

  if (!response) return;

  throw new ApiError('invalid_data', 'Product already exists',
    httpStatusCode.unprocessableEntity);
};

module.exports = {
  create,
};
