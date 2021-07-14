const connection = require('./connection');
const { ObjectId } = require('mongodb');

const newProduct = async (product) => {
  const { name, quantity } = product;
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);
};

module.exports = {
  newProduct,
};
