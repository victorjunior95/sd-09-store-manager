const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerSales = (sale) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
  .then(result => result.ops[0]);

const getSales = () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getSalesListById = async (_id) => connection()
  .then((db) => db.collection('sales').findOne(new ObjectId(_id)));

module.exports = {
  registerSales,
  getSales,
  getSalesListById,
};
