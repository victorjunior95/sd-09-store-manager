const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  const db = await connection();
  const result = await db.collection('sales').insertMany(sale);
  return result.ops[0];
};

const findAll = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOne(new ObjectId(id));
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
};