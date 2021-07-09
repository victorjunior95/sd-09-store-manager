const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (productList) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne( { productList } ))
    .then((result) => (result.ops[0]));
};

module.exports = {
  create,
    
};