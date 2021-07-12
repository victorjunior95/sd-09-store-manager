const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sales) => {
  const newSales = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }));
  return newSales.ops[0];
};


const getAll = async () => {
  const getAll = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return getAll;
};

const getById = async (id) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }

  const findProduct = await connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectId(id)}));

  return findProduct;
};

module.exports = {
  create,
  getAll,
  getById
};