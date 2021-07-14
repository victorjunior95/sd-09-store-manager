const connection = require('./connection');
const { ObjectId } = require('mongodb');

// const generateSale = async (products) => {
//   await connection()
//     .then((db) => db.collection('products').insertOne({itensSold: [...products]})
//       .then((result) => result.ops[0]));
// };

const generateSale = async (products) => {
  const db = await connection();
  const collection = await db.collection('sales');
  const insertSale = await collection.insertOne({itensSold: [...products]});
  return insertSale.ops[0];
};

const getAllSales = async () => {
  const db = await connection();
  const collection = await db.collection('sales');
  const saleList = await collection.find({}).toArray();
  console.log(saleList);
  return saleList;
};

const findOneSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const collection = db.collection('sales');
  const itensList = collection.findOne(new ObjectId(id));
  return itensList;
};

module.exports = {
  generateSale,
  getAllSales,
  findOneSale,
};