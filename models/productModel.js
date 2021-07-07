const connection = require('./connection');
const { ObjectId } = require('mongodb');
const DB_COLLECTION = 'products';

const insertProduct = async (name, quantity) => {
  console.log('llego');
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).insertOne({name, quantity})
      .then((response) => response.ops[0]));

  return request;
};

const getAllData = async () => {
  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).find({}).toArray());

  return request;
};

const getProduct = async (id) => {

  if(!ObjectId(id)) return;

  const request = await connection().then((db) => 
    db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id)}));

  return request;
};

module.exports = {
  insertProduct,
  getAllData,
  getProduct
};
