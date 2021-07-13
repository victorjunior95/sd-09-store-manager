const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

const createSale = async (itensSold) => {
  if (itensSold
    .map((item) => ObjectId.isValid(item.productId))
    .some((validation) => validation === false)) return false;
  const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  return newSale.ops[0];
};

const getAllSales = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  return connection().then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
