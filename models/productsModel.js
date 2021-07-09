const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connection();
  const collection = await db.collection('products');
  const createQuery = await collection.insertOne({
    name,
    quantity
  });
  const findQuery = await collection.findOne({ name });

  return createQuery && findQuery;
};

const getProduct = async (name) => {
  const db = await connection();
  const collection = await db.collection('products');
  const getProductName = await collection.findOne({ name });
  return getProductName;
};

const getAllProducts = async () => {
  const db = await connection();
  const collection = await db.collection('products');
  const getProducts = await collection.find({}).toArray();
  return getProducts;
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = await db.collection('products');
  const product = await collection.findOne({ _id: { $eq: ObjectId(id) } });
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  const collection = await db.collection('products');
  const product = await collection.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } }
  );

  const findQuery = await collection.findOne({ name });

  return product && findQuery;
};

const deleteProductFromDb = async (id) => {
  const db = await connection();
  const collection = await db.collection('products');
  const product = await collection.deleteOne({ _id: ObjectId(id) });
  return product;
};

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProductFromDb
};