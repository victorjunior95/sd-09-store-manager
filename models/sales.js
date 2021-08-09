const connection = require('./connection');
const { ObjectId } = require('mongodb');

const postSale = (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then(({ ops }) => ops[0]);

const getAllSales = () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getSalesbyId = (id) => connection()
  .then((db) => db.collection('sales').find(ObjectId(id)));

const putSale = (id, itensSold) => connection()
  .then((db) => db.collection('sales')
    .update({ _id: ObjectId(id) }, { $set: { itensSold}})
  );

const deleteSales = (id) => connection()
  .then((db) => db.collection('sales').deleteOne(ObjectId(id)));

module.exports = {
  postSale,
  getAllSales,
  getSalesbyId,
  putSale,
  deleteSales,
};
