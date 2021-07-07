const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerSales = async (itensSold) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);
};

const getAllSales = async () => {
  return connection()
    .then((db) => db.collection('sales').find({}).toArray());
};

const getSalesById = async (id) => {
  const sales = await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return sales;
};

const updateSalesById = async (id, newInfos) => {
  return connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: newInfos }},
    ));
};

const deleteSalesById = async (id) => {
  return connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  registerSales,
  getAllSales,
  getSalesById,
  updateSalesById,
  deleteSalesById,
};
