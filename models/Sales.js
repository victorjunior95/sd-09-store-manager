const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (sale) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
    .then((result) => {
      return {
        result: {
          _id: ObjectId(result.insertedId),
          itensSold: sale,
        },
        code: 200,
      };
    });
};

module.exports = { createSale };