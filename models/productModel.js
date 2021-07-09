const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products')
      .find({}));

  return products.toArray();
};

const getByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .findOne({ name }));

  return product;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw {
    customError: {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    },
  };

  const product = await connection()
    .then((db) => db.collection('products')
      .findOne({ _id: ObjectId(id) }));

  return product;
};

const create = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products')
      .insertOne({ name, quantity }));

  return newProduct.ops[0];
};

module.exports = { 
  getAll, 
  getByName,
  getById,
  create,
};
