const connection = require('../connection/connection.model');

const addProduct = async (newProduct) => {
  const db = await connection();

  const { ops } = await db.collection('products').insertOne(newProduct);

  return ops[0];
};

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ 'name': name });

  return product;
};

module.exports = {
  addProduct,
  findProductByName,
};
