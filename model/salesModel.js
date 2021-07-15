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
  if(!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const updateSale = async (id, items) => {
  return await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: id },
      { $set: { itensSold: items }},
      { upsert: true }
    ));
};

const deleteOneSale = async (id) => {
  return await connection()
    .then((db) => db.collection('sales')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = { createSale, findSaleById, updateSale, deleteOneSale };