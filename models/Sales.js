const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertOneSale = async (productsSold) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: productsSold }))
    .then((sale) => sale.ops[0]);
};

const getAllSales = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getOneSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectId(id)}));
};

module.exports = {
  insertOneSale,
  getAllSales,
  getOneSaleById
};
