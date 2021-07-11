const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (products) => {
  const db = await connection();
  const collection = await db.collection('sales');
  const itemSold = await collection.insertOne({'itensSold': [...products]});
  return {
    _id: itemSold.insertedId,
    itensSold: itemSold.ops[0].itensSold,
  };
};

const getAll = async () => {
  const db = await connection();
  const collection = await db.collection('sales');
  const sales = await collection.find({}).toArray();
  return sales;
};

const getSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = await db.collection('sales');
  const sale = await collection.findOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  create,
  getAll,
  getSale,
};
