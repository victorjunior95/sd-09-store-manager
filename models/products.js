// Req 1 => Querys com o mongodb.
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async(name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity}));
  const createProduct = { _id: insertedId, name, quantity };
  return createProduct;
};
// Req 1
const findByName = async (name) => {
  const productByName = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return productByName;
};
// Req 2
const findAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};
// Req 2
const findById = async (id) => {
  const productById = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  return productById;
};

module.exports = {
  findByName,
  create,
  findAll,
  findById,
};
