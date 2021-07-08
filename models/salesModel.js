const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const postOneSaleIntoDb = async (productId, quantity) => {
  const db = await connection();

  const sales = await db.collection('sales');

  const itensSold = [{
    productId,
    quantity,
  }];

  const newSale = await sales.insertOne({ itensSold });

  const sale = await newSale.ops[0];

  return newSale && sale;
};

const postManySalesIntoDb = async (salesArray) => {
  const db = await connection();

  const sales = await db.collection('sales');

  const itensSold = [
    ...salesArray,
  ];

  const newSale = await sales.insertOne({ itensSold });

  const sale = await newSale.ops[0];

  return newSale && sale;
};

const getAllSalesFromDb = async () => {
  const db = await connection();

  const salesCollection = await db.collection('sales');

  const allSales = await salesCollection.find().toArray();

  return allSales || false;
};

const getSaleFromDb = async (id) => {
  const db = await connection();

  const salesCollection = await db.collection('sales');

  const sale = await salesCollection.findOne({ _id: ObjectId(id) });

  return sale || false;
};

const updateSale = async (id, quantity) => {
  const db = await connection();

  const salesCollection = await db.collection('sales');

  const updatedSale = await salesCollection.
    updateOne(
      { _id: ObjectId(id) }, { $set: { 'itensSold.0.quantity': quantity }}
    );

  const getUpdatedSale = await salesCollection.findOne({_id: ObjectId(id)});

  return updatedSale && getUpdatedSale;
};

const deleteFromDb = async (id) => {
  const db = await connection();

  const sales = await db.collection('sales');

  const saleToBeDeleted = await sales.findOne({ _id: ObjectId(id) });

  const deleteSale = await sales.deleteOne({ _id: ObjectId(id) });

  return deleteSale && saleToBeDeleted;
};

module.exports = {
  postOneSaleIntoDb,
  postManySalesIntoDb,
  getAllSalesFromDb,
  getSaleFromDb,
  updateSale,
  deleteFromDb,
};
