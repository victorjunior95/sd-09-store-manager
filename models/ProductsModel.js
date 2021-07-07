const connection = require('./connection');

const addProduct =  async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  return product.ops[0];
};

const findOneProduct = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));
  return product;
};

const findAllProducts = async () => {};

module.exports = { addProduct, findOneProduct, findAllProducts };