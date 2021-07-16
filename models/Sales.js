const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => 
  connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((result) => ({ sales: result }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
  return sale;
};

const newSale = async (sales) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => result.ops[0]);
};

module.exports = {
  getAll,
  findById,
  newSale,
};
