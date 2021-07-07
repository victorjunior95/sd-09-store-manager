const connection = require('./connection');

const addProduct =  async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  return product.ops;
};

const getAll = async () => {};

module.exports = { addProduct, getAll };