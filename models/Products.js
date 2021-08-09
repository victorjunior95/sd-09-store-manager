const connection = require('./connection');

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => {
      return { id: result.insertedId, name, quantity};
    });

module.exports = {
  create,
};
