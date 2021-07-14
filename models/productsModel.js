const connection = require('./connection');

const listAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

module.exports = {
  listAll,
};