const httpStatusCode = require('../httpStatusCodes');
const connection = require('./connection');
const ApiError = require('../errors/apiError');

const create = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  await validateUniqueProductName(name, productsCollection);

  const response = await productsCollection.insertOne({ name, quantity });
  const inserted = response.ops[0];
  return inserted;
};

const validateUniqueProductName = async (name, productsCollection) => {
  const response = await productsCollection.findOne({name});

  if (!response) return;

  throw new ApiError('invalid_data', 'Product already existis',
    httpStatusCode.unprocessableEntity);
};


module.exports = {
  create,
};
