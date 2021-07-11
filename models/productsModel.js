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

module.exports = {
  getProductByName,
  addProduct,
};
