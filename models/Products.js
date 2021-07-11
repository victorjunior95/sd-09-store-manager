/*
products
{ "_id": ObjectId("5f43cbf4c45ff5104986e81d"), "name": "Produto Silva", "quantity": 10 }
*/

const connection = require('./connections');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const products = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );

  return products.ops;
};

const findByName = async (name) => {
  const products = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!products) return null;

  return products;
};

const getAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());

  return products;
};

const findById = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  const products = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)));

  if (!products) return null;

  return products;
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
};
