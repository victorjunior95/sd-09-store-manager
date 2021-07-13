const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  if (!product) return null;

  return product;
};

const findProductByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));

  if (!product) return null;

  return product;
};

const addProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
};



module.exports = {
  getProductById,
  getAllProducts,
  findProductByName,
  addProduct,
};
