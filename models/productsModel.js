const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const insertedProduct = await connection()
    .then((db) => db.collection('products').insertOne({
      name,
      quantity
    }));

  return insertedProduct;
};

const searchProducts = async (prodName) => {
  const searchedProduct = await connection()
    .then((db) => db.collection('products').findOne({
      name: prodName
    }));

  return searchedProduct;
};

module.exports = {
  createProduct,
  searchProducts,
};
