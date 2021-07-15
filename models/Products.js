const connection = require('./connection');

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

async function createProduct(name, quantity) {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

module.exports = {
  findByName,
  fetchProducts,
  createProduct,
};
