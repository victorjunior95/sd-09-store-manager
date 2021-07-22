const connection = require('./mongoConnection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const createProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);
    
  return createProduct;
};

const getAll = () => {
  const products = connection()
    .then((db) => db.collection('products').find().toArray());

  return products;
};

module.exports = {
  create,
  getAll,
};
