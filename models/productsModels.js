const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertProduct = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity}))
    .then((res) => res.ops[0]);
};

const findProduct = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }));
};

module.exports = {
  insertProduct,
  findProduct,
};
