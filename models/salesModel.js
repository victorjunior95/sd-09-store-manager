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

const salesUpdateModel = async (id, productId, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const updateSales = await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { productId, quantity }},
    ));

  return true;
};

module.exports = {
  registerSales,
  getAllSalesModel,
  getSalesIdModel,
  salesUpdateModel,
};