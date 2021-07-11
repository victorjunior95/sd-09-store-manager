const connection = require('../models/connection');

const createProduct = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return newProduct.ops[0];
};

const productNameCheck = (name) => {
  return connection().then((db) => db.collection('products').findOne({ name }));
};

module.exports = {
  createProduct,
  productNameCheck,
};