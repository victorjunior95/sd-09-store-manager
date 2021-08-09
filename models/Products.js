const connection = require('./connection');

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => {
      return { id: result.insertedId, name, quantity};
    });

const findProductByName = async (name) =>
  connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then(result => result);

module.exports = {
  create,
  findProductByName,
};
