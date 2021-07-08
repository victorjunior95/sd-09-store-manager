const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((product) => ({ '_id': product.insertedId, name, quantity }));

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray())
  .then((products) => products
    .map(({ _id, name, quantity }) => ({ _id, name, quantity })));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)))
    .then(({ _id, name, quantity }) => ({ _id, name, quantity }));
};

module.exports = {
  create,
  getAll,
  getById,
};
