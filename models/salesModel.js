const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (order) => {
  const db = await connection();
  const addOrder = await db.collection('sales').insertOne({ itensSold: order});
  // o addOrder.ops retorna um array que na posiçao zero tem a minha inserção
  return addOrder.ops[0];
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getSaleById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
