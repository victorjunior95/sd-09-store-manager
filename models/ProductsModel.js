const connection = require('./connection');

const find = async () => {
  const i = await connection().then((db) => db.collection('products').find().toArray());

  return i;
};

const create = async (name, quantity) => {
  const products = await connection().then((db) => db.collection('products').insertOne(
    {
      name,
      quantity,
    }));

  return products;
};


module.exports = {
  find,
  create,
};