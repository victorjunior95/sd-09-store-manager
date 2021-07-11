const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (sale) => {
  const newSale = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold: sale }));

  return newSale.ops[0];
};


module.exports = { 
  create,
};