const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createSale = async (prodArray) => {
  const cnt = await connection();
  const sale = cnt.collection('sales').insertOne({ itensSold: [...prodArray] });

  return sale;
};

const listAllSales = async () => {
  const cnt = await connection();
  const products = cnt.collection('sales').find().toArray();

  return products;
};

module.exports = {
  createSale,
  listAllSales,
};
