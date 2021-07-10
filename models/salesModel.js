const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const create = async (productsArray) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: productsArray }))
  .then(({ ops }) => ({ _id: ops[0]._id, itensSold: ops[0].itensSold }));

module.exports = {
  create,
};
