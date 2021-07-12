const connection = require('./connection');
const {ObjectId} = require('mongodb');

// const ProductModels = require('./ProductsModels');

async function create(itenSold) {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({itenSold});

  const result = await sales.ops[0];
  return {
    _id: result._id,
    itensSold: result.itenSold
  };
}


module.exports = {
  create
};