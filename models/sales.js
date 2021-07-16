const { ObjectId } = require('mongodb');
const conn = require('./connections');

const addSalesDB = async (sales) => {
  const db = await conn();
  const itensSold = await db
    .collection('sales')
    .insertOne({ itensSold: [...sales] });

  return itensSold.ops[0];
};

const getAllSalesDB = async () => {
  const db = await conn();
  const allSalesList = await db.collection('sales').find().toArray();
  return { sales: allSalesList };
};

const getSaleByIdDB = async (id) => {
  const db = await conn();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return sale;
};

const editSaleDB = async (id, sale) => {
  const db = await conn();

  await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: [...sale] } });
  const saleEdited = await getSaleByIdDB(id);
  return saleEdited;
};

const deleteSaleDB = async (id) => {
  const db = await conn();
  const foundSale = await getSaleByIdDB(id);

  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return foundSale;
};

module.exports = {
  addSalesDB,
  getAllSalesDB,
  getSaleByIdDB,
  editSaleDB,
  deleteSaleDB,
};
