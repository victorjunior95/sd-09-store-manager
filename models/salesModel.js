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
  addSale,
  getSaleById,
  getSales,
  updateSale,
  deleteSale,
};
