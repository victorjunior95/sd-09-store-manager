const connection = require('./connection');
const { ObjectId } = require('mongodb');

module.exports = {
  addSales: async (body) => {
    const newSale = await connection().then((db) =>
      db.collection('sales').insertOne({ body }));

    return {
      _id: newSale.insertedId,
      itensSold: body
    };
  },
};
