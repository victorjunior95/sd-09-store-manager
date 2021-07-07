const connection = require('./connection');

const findByName = async (name) => {
  const productName = await connection().then((db) => db.collection('products')
    .findOne({ name }));
  if (!productName) return null;
  return productName;
};

const create = async (name, quantity) => {
  const newProduct = await connection().then((db) => db.collection('products')
    .insertOne({ name, quantity }));
  return newProduct.ops[0];
};

module.exports = {
  findByName,
  create,
};