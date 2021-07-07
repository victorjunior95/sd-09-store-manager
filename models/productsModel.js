const mongodb = require('mongodb');
const connection = require('./connection');

const findProductByName = async ({ name }) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne({name}));

  return result;
};

const postNewProduct = async ({ name, quantity }) => {
  const product = await findProductByName({name});

  if(product) return null;

  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return result.ops[0];
};

module.exports = {
  postNewProduct,
};
