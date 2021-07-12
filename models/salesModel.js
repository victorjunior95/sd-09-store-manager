const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

async function addSale(sale) {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold: sale });
  return result.ops[0];
}

module.exports = {
  addSale,
};
