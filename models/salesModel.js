const { ObjectId } = require('mongodb');
const connection = require('./connection');
const collectionSales = 'sales';

const create = async (itensSold) => {
  const newSale = await connection().then((db) =>
    db.collection(collectionSales).insertOne({ itensSold }));

  return newSale.ops[0];
};

module.exports = { 
  create,
};