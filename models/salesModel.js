const connection = require('./connection');
const { ObjectId } = require('mongodb');
const throwSaleNotFound = require('../utils/throwSaleNotFound');
const throwWrongIdFormat = require('../utils/throwIdError');

const getAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales')
      .find({}));

  return sales.toArray();
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throwSaleNotFound();

  const sales = await connection()
    .then((db) => db.collection('sales')
      .findOne({ _id: ObjectId(id) }));

  return sales;
};

const create = async (sale) => {
  const newSale = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold: sale }));

  return newSale.ops[0];
};

const update = async (id, sales) => {
  if (!ObjectId.isValid(id)) throwSaleNotFound();

  const result = await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sales } }));

  return result.modifiedCount;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};