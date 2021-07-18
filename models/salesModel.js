const connection = require('./connections');
const { ObjectId } = require('mongodb');

const createSales = async (newSales) => {
  const result = await connection()
    .then((db) => db
      .collection('sales')
      .insertOne({ itensSold: newSales }));
  return result.ops[0];
};

const getAllSales = async () => {
  return await connection()
    .then((db) => db
      .collection('sales')
      .find()
      .toArray())
    .then((result) => ({ sales: result }));
};

const getByIdSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection()
    .then((db) => db
      .collection('sales')
      .findOne(ObjectId(id)));
};

module.exports = {
  createSales,
  getAllSales,
  getByIdSale,
};
