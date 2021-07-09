const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function createNewSale(itensSold) {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold });
  return result.ops[0];
}

async function getAllSalesFromDB() {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return result;
}

async function findSaleById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOne(ObjectId(id));
  return result;
}

module.exports = {
  createNewSale,
  getAllSalesFromDB,
  findSaleById,
};
