const connection = require('./connection');

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((product) => ({ '_id': product.insertedId, name, quantity }));


module.exports = {
  create,
};
