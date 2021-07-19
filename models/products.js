const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = { getAllProducts, getProductById };
