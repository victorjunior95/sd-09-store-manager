const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection.insertOne({ name, quantity });
  const inserted = response.ops[0];
  return inserted;
};

module.exports = {
  create,
};
