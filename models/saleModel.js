const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne( { itensSold } ))
    .then((result) => (result.ops[0]));
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const intensSold = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));

  if (!intensSold) return null;

  return intensSold;
};

module.exports = {
  create,
  getAll,
  getById,
};