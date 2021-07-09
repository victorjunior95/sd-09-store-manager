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

async function updateSaleFromDB(id, itensSold) {
  if(!ObjectId(id)) return null;
  const values = { $set: { itensSold } };
  const db = await connection();
  await db.collection('sales').updateOne({ _id: ObjectId(id) }, values);
  return {
    _id: id,
    itensSold,
  };
}

module.exports = {
  createNewSale,
  getAllSalesFromDB,
  findSaleById,
  updateSaleFromDB,
};
