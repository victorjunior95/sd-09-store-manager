const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const postIntoDb = async (name, quantity) => {
  const db = await connection();

  const products = await db.collection('products');

  const newProduct = await products.insertOne({ name, quantity });

  const product = await newProduct.ops[0];

  return newProduct && product;
};

const getProductByName = async (name) => {
  const db = await connection();

  const products = await db.collection('products');

  const product = await products.findOne({ name });

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

  return getById || false;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();

  const collection = await db.collection('products');

  const updatedProduct = await collection
    .updateOne(
      {_id: ObjectId(id)}, { $set: { name, quantity }}
    );

  const getUpdatedProduct = await collection.findOne({ _id: ObjectId(id) });

  return updatedProduct && getUpdatedProduct;
};

const deleteProduct = async (id) => {
  const db = await connection();

  const collection = await db.collection('products');

  const productToBeDeleted = await collection.findOne({ _id: ObjectId(id) });

  const deleteProduct = await collection.deleteOne({ _id: ObjectId(id) });

  return deleteProduct && productToBeDeleted;
};

module.exports = {
  postIntoDb,
  getProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
