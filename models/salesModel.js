const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (order) => {
  const db = await connection();
  const addOrder = await db.collection('sales').insertOne({ itensSold: order});
  // o addOrder.ops retorna um array que na posiçao zero tem a minha inserção
  return addOrder.ops[0];
};

module.exports = {
  createSale,
};
