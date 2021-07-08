const connection = require('./connection');

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((product) => ({ '_id': product.insertedId, name, quantity }));

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray())
  .then((products) => products
  .map(({ _id, name, quantity }) => ({ _id, name, quantity })));

module.exports = {
  create,
  getAll,
};
