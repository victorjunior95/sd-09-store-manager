const connection = require('./connection');
const {ObjectId} = require('mongodb');

// const ProductModels = require('./ProductsModels');

async function create(itensSold) {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({itensSold});

  const result = await sales.ops[0];
  return {
    _id: result._id,
    itensSold: result.itensSold
  };
}

async function getAll() {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();  
  return {
    sales: sales
  };
}

async function findById(id) {
  if(!ObjectId.isValid(id)) {
    return null;
  }
  
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return {
    sales: sale
  };
}


module.exports = {
  create,
  getAll,
  findById
};