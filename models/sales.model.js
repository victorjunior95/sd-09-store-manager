const connection = require('../connection/connection.model');
const { ObjectId } = require('mongodb');

const getDB = async () => await connection();

const createSales = async (sales) => {
  const db = await getDB();
  const { ops } = await db.collection('sales').insertOne({ itensSold: sales });

  return ops[0];
};

const listSales = async () => {
  const db = await getDB();
  const salesList = await db.collection('sales').find().toArray();

  return salesList;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getDB();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  console.log(sale);

  return sale;
};

module.exports = {
  createSales,
  listSales,
  getSaleById
};
