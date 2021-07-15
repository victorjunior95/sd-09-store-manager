const connection = require('./connection');

const listAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

const registerProduct = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return product.ops[0];
};

const getProduct = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return product;
};

const listProductId = async (id) => {
  console.log(id);
  const product = await connection()
    .then((db) => db.collection('products').findOne({ _id: id }));
  return product;
};

module.exports = {
  listAll,
  registerProduct,
  getProduct,
  listProductId,
};