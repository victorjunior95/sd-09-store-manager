const connection = require('./connection');
const { ObjectId } = require('mongodb');
const throwSaleNotFound = require('../utils/throwSaleNotFound');

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


module.exports = {
  getAll,
  getById,
  create,
};