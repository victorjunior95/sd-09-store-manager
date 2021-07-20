const connection = require('./connection');
const { ObjectId } = require('mongodb');

const postProduct = async (name, quantity) => {
  const prod = await connection().then((db) => db.collection('products').insertOne({ name, quantity }));
  return prod.ops[0];
  // console.log(prod);
};

const getAllProducts = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const findOne = async (name) => {
  const prod = await connection()
    .then((db) => db.collection('products').findOne({ 'name': name }));

  return prod;
};

module.exports = { getAllProducts, getProductById, postProduct, findOne };
