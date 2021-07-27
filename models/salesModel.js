const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createSale = async (prodArray) => {
  const cnt = await connection();
  const sale = cnt.collection('sales').insertOne({ itensSold: [...prodArray] });

  return sale;
};

const listAllSales = async () => {
  const cnt = await connection();
  const sales = cnt.collection('sales').find().toArray();

  return sales;
};

const searchSaleByID = async (saleID) => {
  const cnt = await connection();
  const searchedSale = cnt.collection('sales')
    .find({ _id: ObjectId(saleID) }).toArray();

  return searchedSale;
};

const updateSale = async (mongoId, itensSold)=> {
  const cnt = await connection();
  const update = cnt.collection('sales')
    .updateOne({ _id: ObjectId(mongoId) },{ $set: { itensSold } });

  return update.acknowledged;
};

module.exports = {
  createSale,
  listAllSales,
  updateSale,
  searchSaleByID,
};
