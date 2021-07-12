const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

async function addSale(sale) {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold: sale });
  return result.ops[0];
}

async function getSaleById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return result;
}

async function getSales() {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
}

module.exports = {
  addSale,
  getSaleById,
  getSales,
};
