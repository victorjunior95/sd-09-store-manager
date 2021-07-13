const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getNewProduct = (productData) => {
  const {_id, name, quantity } = productData;

  return {
    _id,
    name,
    quantity,
  };
};

const getProductName = async (name) => {
  return connection()
    .then((db) => db.collection('products').find({name}).toArray());
};

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({name, quantity})
      .then((result) => getNewProduct({_id: result.insertedId, name, quantity})));
};

const allProducts = async () => {
  const data = await connection()
    .then((db) => db.collection('products').find({}).toArray());
  return data;
};

const findProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  console.log('teste');
  const product = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  return product;
};

module.exports = {
  createProduct,
  getProductName,
  allProducts,
  findProduct,
};