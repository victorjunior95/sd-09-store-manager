const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function newSale(sale) {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold: sale });
  return result.ops[0];
}

async function fetchSales() {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
}

async function findById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return result;
}

async function updateSale(id, sale) {
  const db = await connection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: sale } }
  );
  return { _id: id, itensSold: sale };
}

async function deleteSale(id) {
  const db = await connection();
  const result = await db.collection('sales').findOneAndDelete({ _id: ObjectId(id) });
  return result.value;
}

module.exports = {
  newSale,
  fetchSales,
  findById,
  updateSale,
  deleteSale,
};
