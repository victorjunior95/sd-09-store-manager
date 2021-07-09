const connection = require('./connection');

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .findOne({ name }));

  return product;
};

const create = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products')
      .insertOne({ name, quantity }));

  return newProduct.ops[0];
};

module.exports = { create, findByName };
