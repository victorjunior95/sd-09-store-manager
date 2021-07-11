const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  
  return {
    _id: newProduct.insertedId,
    name,
    quantity,
  };
};

const getProductByName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const findProductById = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const updateProduct = async (id, name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').updateOne(
      {_id: id},
      {$set: { name, quantity }},
      {upsert: true}));
};

module.exports = {
  createProduct,
  getProductByName,
  getAll,
  findProductById,
  updateProduct };
