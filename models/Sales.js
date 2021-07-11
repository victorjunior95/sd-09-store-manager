const connection = require('./connections');
const { ObjectId } = require('mongodb');

const create = async (array) => {
  const sales = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: array }),
  );

  return sales.ops;
};

const getAll = async () => {
  const sales = await connection().then((db) =>
    db.collection('sales').find().toArray());

  return sales;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sales = await connection().then((db) =>
    db.collection('sales').findOne(new ObjectId(id)));

  if (!sales) return null;

  return sales;
};

module.exports = {
  create,
  getAll,
  findById,
};
