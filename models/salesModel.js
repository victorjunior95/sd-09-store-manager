const connection = require('./connection');

const { ObjectId } = require('mongodb');

const COLLECTION = 'sales';

const addSales = async (salesData) => {
  const salesCollection = await connection().then((db) => db.collection(COLLECTION));

  const { insertedId: _id } = await salesCollection.insertOne(
    { itensSold: salesData },
  );

  return { _id, itensSold: salesData };
};

module.exports = {
  addSales,
};
