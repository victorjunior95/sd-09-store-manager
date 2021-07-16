const connection = require('./connection');
const { ObjectId, connect } = require('mongodb');

const getUpdatedSale = ({ _id, productId, quantity }) => {
  return {
    _id,
    itensSold: [
      {
        productId,
        quantity
      }
    ]
  };
};

const insertOneSale = async (productsSold) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: productsSold }))
    .then((sale) => sale.ops[0]);
};

const getAllSales = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getOneSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const updateOneSale = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) }, {
      $set: {
        productId,
        quantity
      }
    }))
    .then(() => getUpdatedSale({ _id: ObjectId(id), productId, quantity }));
};

const deleteOneSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }));
};

module.exports = {
  insertOneSale,
  getAllSales,
  getOneSaleById,
  updateOneSale,
  deleteOneSale
};
