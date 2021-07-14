const connection = require('../connect');

const listSales = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

module.exports = listSales;