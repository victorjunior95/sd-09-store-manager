// const { ObjectId } = require('mongodb');

const connection = require('./connection');

const create = async (name, quantity) => {
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => getNewProduct({ id: result.insertedId, name, quantity }));
};

const findByName = async (name) =>
  await connection()
    .then((db) => db.collection('products').find({ name }).toArray());


module.exports = {
  create,
  findByName,
};
