const connection = require('./mongoConnection');
const { ObjectId } = require('mongodb');

const findByName = async (name) => {
  const existingProduct = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  return existingProduct;
};

const createProduct = async (name, quantity) => {
  const createProduct = await connection()
    .then((db) => db.collection('products').insertOne( { name, quantity } ))
    .then((result) => result.ops[0]);
    
  return createProduct;
};

const getAllProducts = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('products').find().toArray());

  return allProducts;
};

const getProductId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const productId = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  return productId;
};

module.exports = {
  findByName,
  createProduct,
  getAllProducts,
  getProductId,
};
