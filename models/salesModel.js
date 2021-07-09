const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const salesRegister = async (sales) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: sales }));
  return result.ops[0];
};

const getAllSales = async () => {
  const result = await connection().then((db) =>
    db.collection('sales').find().toArray());
  return result;
};

const getSaleById = async (id) => {
  const result = await connection().then((db) => 
    db.collection('sales').findOne({ _id: ObjectId(id) }));
  return result;
};


module.exports = {
  salesRegister,
  getAllSales,
  getSaleById,
};
