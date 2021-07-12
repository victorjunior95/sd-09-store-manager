const connection = require('./connection');
const { ObjectId } = require('mongodb');

const salesProduct = async (itensSold) => {
  const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold}));
  return {
    _id: newSale.ops[0]._id,
    itensSold: newSale.ops[0].itensSold,
  };
};

const listAllSales = async () => {
  const [allSales] = await connection()
    .then((db) => db.collection('sales').find().toArray());
  console.log(allSales);
  return {
    sales: [
      allSales
    ]
  };
};

const listOneSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({_id: ObjectId(id)}));
  return sale;
};

const updateSale = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('sales')
    .updateOne({_id: ObjectId(id) }, { $set: {itensSold} });
  return {
    _id: id,
    itensSold
  }; 
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('sales').findOneAndDelete({_id: ObjectId(id)});
  return result.value;
};

module.exports = {
  salesProduct,
  listAllSales,
  listOneSale,
  updateSale,
  deleteSale,
};