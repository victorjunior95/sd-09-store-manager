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

module.exports = {
  addProduct,
  findProductByName,
  listProducts,
  getProductById
};
