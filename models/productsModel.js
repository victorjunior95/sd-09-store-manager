const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connection();
  const collection = await db.collection('products');
  const createQuery = await collection.insertOne({
    name,
    quantity
  });
  const findQuery = await collection.findOne({ name });

  return createQuery && findQuery;
};

const getProduct = async (name) => {
  const db = await connection();
  const collection = await db.collection('products');
  const getProductName = await collection.findOne({ name });
  return getProductName;
};

module.exports = {
  createProduct,
  getProduct,
};