const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => (
  await connection().then((db) => db.collection('products').insertOne({ name, quantity }))
);

const findByName = async (name) => (
  await connection().then((db) => db.collection('products').findOne({ name }))
);

const getAll = async () => (
  await connection().then((db) => db.collection('products').find().toArray())
);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { code: 'invalid_data', message: 'Wrong id format'}};
  }
  return await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
};

const update = async (product) => {
  const { id } = product;

  if (!ObjectId.isValid(id)) {
    return { err: { code: 'invalid_data', message: 'Wrong id format'}};
  }
  return await connection()
    .then(
      (db) => db.collection('products')
        .findOneAndUpdate(
          { _id: new ObjectId(id) }, { $set: product }, { returnOriginal: false }
        ).then((result) => result.value)
    );
};

module.exports = { create, findByName, getAll, findById, update };
