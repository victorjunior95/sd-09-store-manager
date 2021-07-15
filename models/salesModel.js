const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  const connect = await connection();
  const result = await connect
    .collection('sales').find().toArray();
  return result;
};

const createSale = async (products) => {
  const connect = await connection();
  const result = await connect.collection('sales').insertOne({'itensSold': products });
  return result.ops[0];
};

module.exports = { createSale, getAllSales };