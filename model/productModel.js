const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  
  return {
    _id: newProduct.insertedId,
    name,
    quantity,
  };
};

const findProductByName = async (name) => {
  const foundProduct = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return foundProduct;
};

module.exports = { createProduct, findProductByName };
