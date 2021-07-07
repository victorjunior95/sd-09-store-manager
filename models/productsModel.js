const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const postIntoDb = async (name, quantity) => {
  const db = await connection();

  const products = await db.collection('products');

  const newProduct = await products.insertOne({ name, quantity });

  const getNewProduct = await db.collection('products').findOne({ name });

  return newProduct && getNewProduct;
};

const getProductByName = async (name) => {
  const db = await connection();

  const products = await db.collection('products');

  const product = await products.findOne({ name });

  // console.log(product);

  return product || false;
};

const getAllProducts = async () => {
  const db = await connection();

  const collection = await db.collection('products');

  const products = await collection.find().toArray();

  return products || false;
};

const getProductById = async (id) => {
  const db = await connection();

  const collection = await db.collection('products');

  const getById = await collection.findOne({ _id: ObjectId(id) });

  return getById;
};

module.exports = {
  postIntoDb,
  getProductByName,
  getAllProducts,
  getProductById,
};
