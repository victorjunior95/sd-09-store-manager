const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createSale = async (prodArray) => {
  const cnt = await connection();
  const sale = cnt.collection('sales').insertOne({ itensSold: [...prodArray] });

  return sale;
};

module.exports = {
  createSale,
};
