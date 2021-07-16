const { ObjectId } = require('mongodb');
const connection = require('../connection/connection');

const createSale = async (itensSold) => {
  const newSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  
  return {
    _id: newSale.insertedId,
    itensSold,
  };
};

const findSaleById = async (id) => {
  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const updateSale = async (id, items) => {
  return await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: items }},
      { upsert: false }
    ));
};

const deleteOneSale = async (id) => {
  const sale = await findSaleById(id);
  await connection()
    .then((db) => db.collection('sales')
      .deleteOne({ _id: ObjectId(id) }));
  return sale;
};

module.exports = { createSale, findSaleById, updateSale, deleteOneSale };