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

  return sale;
};

const updateSaleById = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getDB();
  const sale = await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });

  return sale && { _id: id, itensSold };
};

const deleteSaleById = async (id) => {
  const sale = await getSaleById(id);

  const db = await getDB();
  sale && await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return sale;
};

module.exports = {
  createSales,
  listSales,
  getSaleById,
  updateSaleById,
  deleteSaleById
};
