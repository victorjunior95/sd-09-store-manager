const connection = require('./connection');

const insertProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({
      name,
      quantity
    }))
    .then((result) => result.ops[0]);
};

const getByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').find({
      name
    }).toArray());
};

module.exports = {
  insertProduct,
  getByName
};
