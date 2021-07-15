const connection = require('./connection');

const create = async (name, quantity) => {
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

module.exports = {
  create
};
