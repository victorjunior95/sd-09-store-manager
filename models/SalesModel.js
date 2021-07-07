const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSales = async (body) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: body }));
};

const getAllSales = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  const sale = connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  
  if (!sale) return null;

  return sale;
};

const editSale = async (id, body) => {
  const newSale = await connection()
    .then((db) => db.collection('sales')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { itensSold: body } }, 
        { returnOriginal: false}
      ))
    .then((result) => result.value);
  
  return newSale;
};

const deleteSale = async (id) => {

};

module.exports = {
  createSales,
  getAllSales,
  findById,
  editSale,
  deleteSale
};
