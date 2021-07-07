const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  
  if (!product) return null;

  return product;
};

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

module.exports = {
  findByName,
  createProduct
};
