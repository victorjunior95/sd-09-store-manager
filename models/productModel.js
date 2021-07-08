const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findProductbyName = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((product) => product);
};

const create = async (name, quantity) => {
  return connection().then((db) =>
    db.collection('products').insertOne({ name,quantity }))
	  .then((result) => ({ _id: result.insertedId, name, quantity }));
};

module.exports = { create, findProductbyName };