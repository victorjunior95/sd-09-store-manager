const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((result) => result);
};

const getSaleById = async (id) => {
  return connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .then((result) => result);
};

const insertSale = async (orders) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({itensSold: orders}))
    .then((result) => result.ops[0]);
};

const updateSale = async (saleId, productId, quantity) => {
  connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(saleId) },
      { $set: { 'itensSold.$[element].quantity': quantity } },
      { arrayFilters: [{ 'element.productId': productId }] },
    ))
    .then((result) => console.log(result));

  const sale = await getSaleById(saleId);
  return sale;
};

const deleteSale = async (id) => {
  const sale = await getSaleById(id);
  await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

  return sale;
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
