const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findByName = async (name) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  
  if (!result) return null;
  return result;
};

const listProducts = (products) => {
  return {
    products 
  };
};

const getAll = async () => 
  connection()
    .then((db) => db.collection('products').find().toArray())
    .then((result) => listProducts(result));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  
  return product;

};

module.exports = {
  create,
  findByName,
  getAll,
  findById
};
