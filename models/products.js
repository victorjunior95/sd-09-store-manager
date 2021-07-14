const connection = require('./connection');

const createProduct = async (data) => {
  const result = await connection()
    .then((db) => db.collection('products').insertOne(data));

  return result.ops[0];
};

const findProductByName = async (productName) => {
  const result = await connection()
    .then((db) => db.collection('products').find({ name: productName }).toArray());
  return result;
};

module.exports = {
  createProduct,
  findProductByName,
};
