const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => (
  await connection().then((db) => db.collection('sales').insertOne({ itensSold: sale }))
);

const getAll = async () => (
  await connection().then((db) => db.collection('sales').find().toArray())
);

const findById = async (id) => (
  await connection().then((db) => db.collection('sales').findOne(new ObjectId(id)))
);

const update = async ({ id, products }) => (
  await connection().then((db) => db.collection('sales')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { itensSold: products} },
      { returnOriginal: false },
    ).then((result) => result.value))
);

const del = async (id) => (
  await connection()
    .then(
      (db) => db.collection('sales')
        .deleteOne({_id: new ObjectId(id)})
    )
);

module.exports = { create, getAll, findById, update, del };
