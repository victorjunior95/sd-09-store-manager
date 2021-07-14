const { ObjectID } = require('mongodb');
const connection = require('../connect');

const findProduct = async (id) => {
  const db = await connection();
  return db.collection('products').findOne({ _id: ObjectID(id) });
};

module.exports = findProduct;