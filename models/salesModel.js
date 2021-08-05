const connection = require('./mongoConnection');
const { ObjectId } = require('mongodb');

const registerSales = async (productId, quantity) => {
  const newSales = await connection()
    .then((db) => db.collection('sales')
      .insertOne({ itensSold:[{ productId, quantity }]}))
    .then((result) => result.ops[0]);

  return newSales;
};

const getAllSalesModel = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return allSales;
};

const getSalesIdModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const salesId = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  return salesId;
};

module.exports = {
  registerSales,
  getAllSalesModel,
  getSalesIdModel,
};