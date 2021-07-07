const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const findById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  
  if (!product) return null;

  return product;
};

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  
  if (!product) return null;

  return product;
};

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

module.exports = {
  findByName,
  createProduct,
  findById,
  getAllProducts
};
