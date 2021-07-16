const connection = require('./connection');
const { ObjectId } = require('mongodb');

const dbProduct = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);

  return newProduct;

};

module.exports = dbProduct;
