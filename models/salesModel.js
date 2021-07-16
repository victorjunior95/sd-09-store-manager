const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (order) => {
  const db = await connection();
  const addOrder = await db.collection('sales').insertOne({ itensSold: order});
  return addOrder.ops[0];
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getSaleById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const editSale = async (id, edit) => {
  const { productId, quantity } = edit[0];
  const db = await connection();
  const newProd = await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { productId, quantity }},
  );
  return { _id: id, itensSold: edit };
};

const deleteSale = async (id) => {
  const db = await connection();
  const deletedSale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  const checkDelete = await db.collection('sales').findOne({_id: ObjectId(id)});
  return checkDelete;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  editSale,
  deleteSale,
};