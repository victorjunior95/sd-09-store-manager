const connection = require('./connection');
const { ObjectId } = require('mongodb');

module.exports = {
  findByName: (name, _quantity) => {
    return connection().then((db) => db.collection('products').findOne({ name }));
  },

  addProduct: async (name, quantity) => {
    const newProduct = await connection().then((db) =>
      db.collection('products').insertOne({ name, quantity }));

    return newProduct.ops[0];
  },
};
