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
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .then(({ _id, name, quantity }) => ({ _id, name, quantity }));
};

const upDate = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('products')
      .updateOne({ id: ObjectId(id) }, { $set: { name, quantity } }))
    .then(() => ({ _id: id, name, quantity }));
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  getAll,
  getById,
  upDate,
  deleteProduct,
};
