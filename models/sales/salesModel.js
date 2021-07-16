const { ObjectId } = require('mongodb');
const connection = require('../connection');

const findProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const createSales = async (productsSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: productsSold }));

  return {
    _id: insertedId,
    itensSold: productsSold,
  };
};

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray());
};

module.exports = {
  findProduct,
  createSales,
  getAll,
  getById,
};
