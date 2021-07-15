const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  const connect = await connection();
  const result = await connect
    .collection('sales').find().toArray();
  return result;
};

const createSale = async (products) => {
  const connect = await connection();
  const result = await connect.collection('sales').insertOne({ 'itensSold': products });
  return result.ops[0];
};

const getSaleById = async (id) => {
  const connect = await connection();
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const result = await connect
    .collection('sales').findOne({ _id: new ObjectId(id) });

  return result;
};

const updateSale = async (id, productId, quantity) => {
  const connect = await connection();
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const result = await connect
    .collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: [{ productId, quantity, }] } }
    );
  return result;
};

const deleteSale = async (id) => {
  const connect = await connection();
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const result = await connect
    .collection('sales').deleteOne({ _id: new ObjectId(id)});

  return result;
};

module.exports = { createSale, getAllSales, getSaleById, updateSale, deleteSale };