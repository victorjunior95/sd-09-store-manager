const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createNewProduct = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => (result.ops[0])); //ou { _id: result.insertedId, name, quantity }

const findByName = async (name) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  if (!result) return null;
  return result;
};

const listProducts = (products) => {
  return {
    products 
  };
};

const getAll = async () => 
  connection()
    .then((db) => db.collection('products').find().toArray())
    .then((result) => listProducts(result));
  

const findById = async (id) =>
  connection()
    .then((db) => db.collection('products'))
    .then((products) => products.findOne(ObjectId(id)));

module.exports = {
  createNewProduct,
  findByName,
  getAll,
  findById,
};