const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const insertedProduct = await connection()
    .then((db) => db.collection('products').insertOne({
      name,
      quantity
    }));

  return insertedProduct;
};

const searchProductsByName = async (prodName) => {
  const cnt = await connection();
  const searchedProduct = cnt.collection('products').find({ name: prodName }).toArray();

  return searchedProduct;
};


const searchProductsByID = async (prodID) => {
  const cnt = await connection();
  const searchedProduct = cnt.collection('products')
    .find({ _id: ObjectId(prodID) }).toArray();

  return searchedProduct;
};

const listAllProducts = async () => {
  const cnt = await connection();
  const products = cnt.collection('products').find().toArray();

  return products;
};

module.exports = {
  createProduct,
  searchProductsByName,
  searchProductsByID,
  listAllProducts,
};
