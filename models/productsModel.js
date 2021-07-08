const  connection = require('./connection');
const { ObjectId } = require('mongodb');

async function findProductByName(name) {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
}

async function createNewProduct(productName, quantity) {
  const db = await connection();
  const product = await db.collection('products')
    .insertOne({ name: productName, quantity });
  const result = product.ops[0];
  return result;
}

async function getAllProductsFromDB() {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
}

async function findProductByIdFromDB(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('products').findOne(ObjectId(id));
  return result;
}

async function updateProductFromDB(id, name, quantity) {
  if (!ObjectId.isValid(id)) return null;
  const values = { $set: { name, quantity } };
  const db = await connection();
  await db.collection('products').update({ _id: ObjectId(id) }, values);

  return {
    _id: id,
    name,
    quantity,
  };
}

module.exports = {
  createNewProduct,
  findProductByName,
  getAllProductsFromDB,
  findProductByIdFromDB,
  updateProductFromDB,
};
