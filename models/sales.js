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

module.exports = { create, getAll, findById };
