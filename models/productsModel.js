const connection = require('./connections');
const { ObjectId } = require('mongodb');

const findByName = async (name) => await connection()
  .then((db) => db.collection('products').findOne({ name }));

const createProduct = async (name, quantity) => {
  const newProduct = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity}));
  return { _id: newProduct.insertedId, name, quantity };
};

const getAllProducts = async () => {
  const products = await connection().then((db) =>
    db.collection('products').find().toArray());
  return { products: products };
};

const getByIdProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connection().then((db) =>
    db.collection('products').findOne({ _id: ObjectId(id) }));
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  const result = await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } });
  return result;
};

module.exports = {
  createProduct,
  findByName,
  getAllProducts,
  getByIdProduct,
  updateProduct,
};
