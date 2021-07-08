const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const newProduct = await connection
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  
  return {
    id: newProduct.insertedId,
    name,
    quantity,
  };
};

module.exports = { createProduct };