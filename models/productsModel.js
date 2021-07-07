const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerProduct = async (product) => {
  const { name, quantity } = product;
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);
};

const findProduct = async (product) => {
  const { name } = product;
  const result = await connection()
    .then((db) => db.collection('products').findOne({ name: name }));
  return result;
};

const getAllProducts = async () => {
  const result = await connection()
    .then((db) => db.collection('products').find({}).toArray());
  return result;
};

const getById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  return result;
};

const updateProductById = async (id, newInfos) => {
  return connection().then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: newInfos },
  ))
    .then(() => ({ _id: ObjectId(id), ...newInfos }));
};

const deleteProductById = async (id) => {
  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  registerProduct,
  findProduct,
  getAllProducts,
  getById,
  updateProductById,
  deleteProductById,
};
