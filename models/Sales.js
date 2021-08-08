const connection = require('./connection');

const { ObjectId } = require('mongodb');

const create = async (items) =>  {
  const db = await connection();

  const newSale = await db.collection('sales').insertOne({ itensSold: items });

  return newSale.ops[0];
};

module.exports = {
  create
};