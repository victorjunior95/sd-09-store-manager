const connection = require('./connection');


const create = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return newProduct.ops[0];
};

const findProductName = async (name) => {
  const findProduct = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  return findProduct;
};

module.exports = {
  create,
  findProductName,
};
