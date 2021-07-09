const { ObjectId } = require('mongodb');
const connection = require('./connection');

function addNewProduct (name, quantity) {
  return connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }))
	  .then(({ ops }) => ops[0]);
}

const getProduct = async(name) => {
  return connection().then((db) => db.collection('products')
    .findOne(name))
    .then((product) => product);
};

module.exports = {
  addNewProduct,
  getProduct,
};