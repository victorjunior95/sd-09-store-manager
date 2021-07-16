const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function newSale(sale) {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold: sale });
  return result.ops[0];
}

async function fetchSales() {
  return connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((result) => ({ sales: result }));
}

async function findById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOne(new ObjectId(id));
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
  if (!ObjectId.isValid(id)) return null;
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
