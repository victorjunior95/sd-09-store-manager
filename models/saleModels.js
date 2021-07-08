const { ObjectId } = require('mongodb');
const connection = require('./connection');
const DB_COLLECTION = 'sales';

const postSales = async (body) => {
  const request = await connection().then((db) =>
    db.collection(DB_COLLECTION).insertOne({itensSold: body})).then((res) => res.ops[0]);
  return request;
};

const getAllData = async () => {
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).find().toArray());

  return {sales: request};
};

const getDataById = async (id) => {
  const request = await connection().then((db) =>
    db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) }));

  return request;
};

const editSaleById =  async (data, id) => {
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION)
      .updateOne({ _id: ObjectId(id)}, { $set : { itensSold: data }})
      .then(() => ({_id: id, itensSold: data})));

  return request;
};

module.exports = {
  postSales,
  getAllData,
  getDataById,
  editSaleById
};
