const connection = require('../connect');

const addProduct = async (product) => {
  const db = await connection();
  const result = await db.collection('products').insertOne(product);
  return { _id: result.insertedId, ...product };
};

module.exports = addProduct;
