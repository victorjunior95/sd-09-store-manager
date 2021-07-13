const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSaleModel = async (salesToInsert) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));
  const { ops } = await salesCollection.insertOne({itensSold: salesToInsert});

  const sucssesSale = {
    _id: ops[0]._id,
    itensSold: ops[0].itensSold.map(({productId, quantity}) => (
      { productId, quantity }
    ))
  };

  return sucssesSale;
};

const readSaleByIdModel = async (id) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));
  
  if (!ObjectId.isValid(id)) return null;

  const sale = await salesCollection.findOne({ _id: ObjectId(id)});
  return sale;
};

const readAllSalesModel = async () => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));
  
  const allSales = await salesCollection.find().toArray();
  const response = {
    sales: allSales
  };

  return response;
};

const updateSaleModel = async (id, productId, quantity) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));

  if (!ObjectId.isValid(id)) return null;
  const itensSold = [{ productId, quantity }];
  const { result } = await salesCollection.updateOne(
    {_id: ObjectId(id)},
    { $set: { itensSold }}
  );

  console.log(result);
  return {alo: 'oi'};
};

module.exports = {
  createSaleModel,
  readSaleByIdModel,
  readAllSalesModel,
  updateSaleModel
};