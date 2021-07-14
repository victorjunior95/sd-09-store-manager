const connection = require('./connection');
const { ObjectId } = require('mongodb');

const generateSale = async (products) => {
  return connection()
    .then((db) => db.collection('products').insertMany({itensSold: [...products]}));
};

module.exports = {
  generateSale,
};