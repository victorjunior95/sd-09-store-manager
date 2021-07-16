const connection = require('./connection');

async function newSale(sale) {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold: sale });
  return result.ops[0];
}

module.exports = {
  newSale,
};
