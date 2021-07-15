const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function findByName(name) {
  const result = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return result;
}

async function fetchProducts() {
  const result = await connection()
    .then((db) => db.collection('products').find().toArray());
  return {
    products: result
  };
}

async function findById(id) {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  return result;
}

async function createProduct(name, quantity) {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
}

async function updateProduct(id, name, quantity) {
  const result = await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } }
    ));
  return { _id: result.id, name, quantity };
}

module.exports = {
  findByName,
  fetchProducts,
  findById,
  createProduct,
  updateProduct,
};
