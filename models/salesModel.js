const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const salesRegister = async (sales) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: sales }));
  return result.ops[0];
};

const getAllSales = async () => {
  const result = await connection().then((db) =>
    db.collection('sales').find().toArray());
  return result;
};

const getSaleById = async (id) => {
  const result = await connection().then((db) => 
    db.collection('sales').findOne({ _id: ObjectId(id) }));
  return result;
};

const updateSale = async (id, body) => {
  const result = await connection()
    .then((db) => db.collection('sales')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { itensSold: body } }, 
        { returnOriginal: false}
      ))
    .then((result) => result.value);
  return result;
};

const deleteSale = async (id) => {
  console.log('ola');
  const result = await connection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }) );
 
  return result;
};

module.exports = {
  salesRegister,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
