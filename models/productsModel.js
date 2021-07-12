const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

async function getProductByName(name) {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
};

async function addProduct(name, quantity) {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return result.ops[0];
}

async function getProducts() {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return { products: result };
}

async function getProductById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  return result;
}

async function updateProduct(id, name, quantity) {
  const db = await connection();
  const result = await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity }},
  );
  return result;
}

async function deleteProduct(id) {
  const db = await connection();
  const result = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return result;
}

async function updateQuantity(id, quantity) {
  const db = await connection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { quantity } },
  );
}

module.exports = {
  getProductByName,
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateQuantity,
};
