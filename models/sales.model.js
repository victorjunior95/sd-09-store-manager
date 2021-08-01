const connection = require('../connection/connection.model');
const { ObjectId } = require('mongodb');

const getDB = async () => await connection();

const createSales = async (sales) => {
  const db = await getDB();

  const { ops } = await db.collection('sales').insertOne({ itensSold: sales });

  return ops[0];
};

module.exports = {
  createSales
};
