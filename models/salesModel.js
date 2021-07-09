const connection = require('./connection');

const addSales = async (body) => {

  const { ops } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: body }));

  console.log(ops);

  return ops[0];
};

module.exports = {
  addSales,
};
