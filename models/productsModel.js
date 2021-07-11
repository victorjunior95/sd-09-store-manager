const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return newProduct.ops[0];
};

const getAllProducts = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  return connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const productNameCheck = (name) => {
  return connection().then((db) => db.collection('products').findOne({ name }));
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  productNameCheck,
};