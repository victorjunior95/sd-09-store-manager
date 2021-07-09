const connection = require('./connection');

// const { ObjectId } = require('mongodb');

const createProduct = async(name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  return {
    _id: newProduct.ops[0]._id,
    name,
    quantity,
  };
};

const findByName = async (name) => {
  const allProducts = await connection()
    .then((db) => db.collection('products').findOne({name}));
  return allProducts;
};

module.exports = {
  createProduct,
  findByName,
};