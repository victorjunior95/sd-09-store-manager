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
    return connection().then((db) =>
      db.collection('sales').find().toArray());
  },

  listSaleById: (id) => {
    return connection().then((db) =>
      db.collection('sales').findOne({ _id: ObjectId(id) }));
  },

  updateSale: async (id, productId, quantity) => {
    await connection().then((db) =>
      db.collection('sales')
        .update({ _id:ObjectId(id) }, { $set: { productId, quantity } })
        .then(() => ({ _id: id, productId, quantity }))
    );

    return {
      _id: id,
      itensSold: [
        {
          'productId': productId,
          'quantity': quantity
        }
      ]
    };
  },

  deleteSale: async (id) => {
    const deleted = await connection().then((db) =>
      db.collection('sales').findOne({ _id: ObjectId(id) })
    );

    await connection().then((db) =>
      db.collection('sales').deleteOne({ _id: ObjectId(id) }));

    return deleted;
  },
};
