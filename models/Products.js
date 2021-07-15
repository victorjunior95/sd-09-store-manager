const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({
      name,
      quantity
    }))
    .then((result) => result.ops[0]);
};

const getByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').find({
      name
    }).toArray());
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
};

module.exports = {
  insertProduct,
  getByName,
  getAll,
  getById
};
