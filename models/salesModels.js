const connection = require('./connection');

const registerSales = async (salesArray) => {
  const sales = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: salesArray }));

  return sales.ops[0];
};

module.exports = {
  registerSales,
};
