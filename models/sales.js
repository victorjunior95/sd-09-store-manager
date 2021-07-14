const connection = require('./connection');

const create = async (sale) => (
  await connection().then((db) => db.collection('sales').insertOne({ itensSold: sale }))
);

module.exports = { create };
