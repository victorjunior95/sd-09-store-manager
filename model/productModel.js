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

const getProductByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getProductById = async (_id) => {
  return await connection()
    .then((db) => db.collection('products').find({ _id }).toArray());
};

module.exports = { createProduct, getProductByName, getAll, getProductById };
