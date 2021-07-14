const connection = require('../connect');

const getProducts = async () => {
  const db = await connection();
  return db.collection('products').find().toArray();
};

module.exports = getProducts;