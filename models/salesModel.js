const connection = require('./connection');
const { ObjectId } = require('mongodb');
const throwSaleNotFound = require('../utils/throwSaleNotFound');
const throwWrongSaleIdFormat = require('../utils/thowSaleIdError');

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

  if (!sales) throwSaleNotFound();

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

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) throwWrongSaleIdFormat();

  const deletedSale = await getById(id);

  const result = await connection().then((db) => db.collection('sales')
    .removeOne({ _id: ObjectId(id) }));

  if (result.deletedCount) {
    return deletedSale;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
