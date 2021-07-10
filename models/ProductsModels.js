const connection = require('./connection');
const {ObjectId} = require('mongodb');

async function create(name, quantity) {
  const db = await connection();
  const createNew = await db.collection('products').insertOne({name, quantity}); 
  const result = await createNew.ops[0];
  return {
    _id: result._id,
    name: result.name,
    quantity: result.quantity
  };
}

async function findByName(name) {
  const db = await connection();
  const findName = await db.collection('products').findOne({name});

  if (!findName) return null;
  
  return {
    _id: findName._id,
    name: findName.name,
    quantity: findName.quantity
  };
}

async function getAllProducts() {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
}

module.exports = {
  getAllProducts,
  create,
  findByName
};