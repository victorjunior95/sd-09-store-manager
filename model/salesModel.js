const connection = require('./connectionMongoDB');
const { ObjectId } = require('mongodb');

const createSales = async (sales) => {
  const result = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold: sales}));

  return result.ops[0];
};

module.exports = {
  createSales,
};
