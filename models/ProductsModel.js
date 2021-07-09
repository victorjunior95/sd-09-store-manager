const connection = require('./connection');

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => {
      return products.map(({ _id, name, quantity }) => {
        return ({
          _id,
          name,
          quantity,
        });
      });
    });
};

const createProduct = async (name, quantity) => {
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};
/*
const addProducts = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));
};
*/
module.exports = {
  getAllProducts,
  createProduct,
};