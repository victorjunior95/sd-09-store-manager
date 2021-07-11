const connection = require('../config/conn');
const {ObjectId} = require('mongodb');

const create = async (name, quantity) => {
  const newProduct = await connection()
    .then(db => db.collection('products').insertOne({name,quantity}));
  //console.log(newProduct);
  return {_id: newProduct.insertedId, name, quantity};
};

const findOne = async (name) => {
  return connection()
    .then(db => db.collection('products').findOne({name}));
};

module.exports = {
  create,
  findOne
};