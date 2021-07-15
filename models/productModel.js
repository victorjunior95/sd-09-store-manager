const connection = require('./connection');

const findProduct = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));  

  return product;
};

const create = async (name, quantity) => {
  const productCreated = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return productCreated.ops[0];
};

module.exports = {
  create,
  findProduct,
};
