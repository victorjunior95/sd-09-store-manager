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

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return false;
  const updatedProduct = await connection()
    .then((db) => db.collection('products')
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, quantity } },
        { returnOriginal: false }));
  return updatedProduct.value;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const deletedProduct = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  return deletedProduct;
};

module.exports = {
  createProduct,
  productNameCheck,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
