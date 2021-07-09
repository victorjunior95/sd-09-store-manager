const connection = require('./connection');

async function createNewSale(itensSold) {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold });
  return result.ops[0];
}

module.exports = {
  createNewSale,
};
