const connection = require('../connection/connection.model');
const { ObjectId } = require('mongodb');

const getDB = async () => await connection();

const addProduct = async (newProduct) => {
  const db = await getDB();

  const { ops } = await db.collection('products').insertOne(newProduct);

  return ops[0];
};

const findProductByName = async (name) => {
  const db = await getDB();

  const product = await db.collection('products').findOne({ 'name': name });

  return product;
};

const listProducts = async () => {
  const db = await getDB();

  const productsList = await db.collection('products').find().toArray();

  return productsList;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getDB();
  const product = await db.collection('products').findOne(ObjectId(id));

  return product;
};

const updateProductById = async (id, { name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getDB();
  const product = await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return product && { _id: id, name, quantity };
};

const deleteProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getDB();
  const deletedProduct = await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return deletedProduct;
};

module.exports = {
  addProduct,
  findProductByName,
  listProducts,
  getProductById,
  updateProductById,
  deleteProductById
};
