const mongodb = require('mongodb');
const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { getProductById } = require('./productsModel');

const postNewSale = async (saleArray) => {
  for ( const item of saleArray ) {
    const product = await getProductById(ObjectId(item.productId));
    if (!product) return null;
  };
  
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: saleArray}));

  return result.insertedId;
};

const getAllSales = async () => {
  const result = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return {
    sales: result
  };
};

const getSaleById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
  return result;
};

const updateSale = async ({ id, itensSold }) => {
  const sale = await getSaleById(id);

  if (!sale) return null;

  const result = await connection()
    .then((db) => db
      .collection('sales')
      .updateOne({ _id: ObjectId(id)}, {$set: { itensSold }}));
  return result.modifiedCount;
};

const deleteSale = async (id) => {
  const sale = await getSaleById(id);

  if(!sale) return null;

  const result = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id)}));
  return sale;
};

module.exports = {
  postNewSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
