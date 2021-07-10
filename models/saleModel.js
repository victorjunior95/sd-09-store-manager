const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne( { itensSold } ))
    .then((result) => (result.ops[0]));
};

module.exports = {
  create,
    
};