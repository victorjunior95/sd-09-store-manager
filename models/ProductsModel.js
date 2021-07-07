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

const editProduct = async (id, name, quantity) => {
  return connection()
    .then((db) => db.collection('products')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        {$set: { name, quantity } },
        {returnOriginal: false}))
    .then((result) => result.value);
};

const deleteProduct = (id) => {
  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  findByName,
  createProduct,
  findById,
  getAllProducts,
  editProduct,
  deleteProduct
};
