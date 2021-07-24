const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
    .then((result) => {
      return {
        result: {
          _id: ObjectId(result.insertedId),
          itensSold: sale,
        },
        code: 200
      };
    });
};

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((data) => {
      return {
        result: {
          sales: data
        },
        code: 200
      };
    });
};

const getSaleById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }))
    .then((data) => {
      return {
        result: data,
        code: 200
      };
    });
};

module.exports = { createSale, getAllSales, getSaleById };