const connection = require('./connection');

const registerProduct = async (product) => {
  const { name, quantity } = product;
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);
};

const findProduct = async (product) => {
  const { name } = product;
  const result = await connection()
    .then((db) => db.collection('products').findOne({ name: name }));
  return result;
};

module.exports = {
  registerProduct,
  findProduct,
};
