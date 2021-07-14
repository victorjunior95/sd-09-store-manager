const connection = require('../connect');

const addSales = async (itensSold) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({ itensSold });
  return { _id: result.insertedId, itensSold };
};

module.exports = addSales;
