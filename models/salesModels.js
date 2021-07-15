const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertSales = async (arrayToInsert) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: arrayToInsert }))
    .then((res) => res.ops[0]);
};

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find({}).toArray());
};

const findSaleById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id)}));
};

const updateSaleById = async (id, itensSold) => {
  return connection()
    .then((db) => db.collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            itensSold: itensSold,
          },
        },
      ))
    .then(() => ({ _id: ObjectId(id), itensSold }));
};

const deleteById = async (id) => {
  return connection()
    .then((db) => db.collection('sales')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  insertSales,
  getAllSales,
  findSaleById,
  deleteById,
  updateSaleById
};
