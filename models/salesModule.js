const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  const db = await connection();
  const result = await db.collection('sales').insertMany(sale);
  return result.ops[0];
};

module.exports = {
  create,
};