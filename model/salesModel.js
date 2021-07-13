const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

const createSale = async (items) => {
  const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ items }));
  
  return {
    _id: newSale.insertedId,
    itensSold: items,
  };
};

module.exports = { createSale };