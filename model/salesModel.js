const connection = require('./connectionMongoDB');
const { ObjectId } = require('mongodb');

const createSales = async (sales) => {
  const result = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold: sales}));

  return result.ops[0];
};

const getSalesAll = async () => {
  const result = await connection()
    .then((db) => db.collection('sales')
      .find().toArray());
  
  return { sales: result };
};

const getSaleById = async (saleId) => {
  if (!ObjectId.isValid(saleId)) {
    return null;
  }

  const result = await connection()
    .then((db) => db.collection('sales')
      .find({ _id: new ObjectId(saleId) }));
  
  if (!result) return null;

  return result;
};

const updateSaleById = async (saleId, data) => {
  if (!ObjectId.isValid(saleId)) {
    return null;
  }

  const result = await connection()
    .then((db) => db.collection('sales')
      .updateOne({ _id: new ObjectId(saleId) }, { $set: { itensSold: data} }));
  
  return { _id: saleId, itensSold: data };
};

module.exports = {
  createSales,
  getSalesAll,
  getSaleById,
  updateSaleById,
};
