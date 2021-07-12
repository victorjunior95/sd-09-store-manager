const connection = require('./connection');
const {ObjectId} = require('mongodb');

// const ProductModels = require('./ProductsModels');

async function create(itenSold) {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({itenSold});

  return sales.ops[0];
}


module.exports = {
  create
};