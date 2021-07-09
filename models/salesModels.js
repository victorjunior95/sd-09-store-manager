const connection = require('./connection');
const { ObjectId } = require('mongodb');

module.exports = {
  addSales: async (body) => {
    const newSale = await connection().then((db) =>
      db.collection('sales').insertOne({ itensSold: body }));

    return {
      _id: newSale.insertedId,
      itensSold: body
    };
  },

  listAllSales: () => {
    const allSales = connection().then((db) =>
      db.collection('sales').find().toArray());

    return allSales;
  },

  listSaleById: (id) => {
    return connection().then((db) =>
      db.collection('sales').findOne({ _id: ObjectId(id) }));
  },
};
