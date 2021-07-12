const connection = require('./connection');

const collection = async () => connection()
  .then((db) => db.collection('products'));

// const create = async (name, quantity) => collection()
//   .then((products) => products.insertOne({ name, quantity }));
const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

const findByName = async (name) => {
  const product = await collection()
    .then((products) => products.findOne({ name }));

  if (!product) return null;

  return product;
};
  

module.exports = {
  create,
  findByName,
};
