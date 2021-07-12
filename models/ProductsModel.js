const connection = require('./connection');

const collection = 'products';

const create = async (name, quantity) => connection()
  .then((db) => db.collection(collection).insertOne({ name, quantity }));

module.exports = {
  create,
};
