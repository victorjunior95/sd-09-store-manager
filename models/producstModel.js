const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const obj = await productsCollection.insertOne({ name, quantity });

  return obj;
};

module.exports = {
  create,
};
