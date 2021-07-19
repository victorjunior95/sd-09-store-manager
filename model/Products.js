const connection = require('./connection');

const createNewProduct = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => (result.ops[0])); //ou { _id: result.insertedId, name, quantity }

module.exports = {
  createNewProduct,
};