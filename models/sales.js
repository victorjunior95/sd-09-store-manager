const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createSales = async (sales) => {
  const result = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold: sales}));

  return result.ops[0];
};

const getSales = async () => {
  const result = await connection()
    .then((db) => db.collection('sales')
      .find().toArray());

  return { sales: result };
};

const getSaleById = async (saleId) => {
  if (!ObjectID.isValid(saleId)) {
    return null;
  }

  const result = await connection()
  .then((db) => db.collection('sales')
    .find({ _id: new ObjectID(saleId) }));

  if(!result) {
    return null;
  }

  return result;
};

module.exports = {
  createSales,
  getSales,
  getSaleById,
};