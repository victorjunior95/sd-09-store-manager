const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => {
      return {
        result: {
          _id: ObjectId(result.insertedId),
          name,
          quantity,
        },
        code: 201,
      };
    });
};

const getByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((data) => data);
  return product;
};

const getAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((data) => data);
  return products;
};

module.exports = { create, getAll, getByName };