const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const cnt = await connection();
  const insertedProduct = cnt.collection('products').insertOne({
    name,
    quantity
  });

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

const updateProducts = async (mongoId, {name, quantity}) => {
  const cnt = await connection();
  const update = cnt.collection('products')
    .updateOne({ _id: ObjectId(mongoId) },{ $set: { name, quantity } });

  return update.acknowledged;
};

const deleteProducts = async (mongoId) => {
  const cnt = await connection();
  const deleteStatus = cnt.collection('products').deleteOne({ _id: ObjectId(mongoId) });

  return deleteStatus;
};

module.exports = {
  createProduct,
  updateProducts,
  deleteProducts,
  searchProductsByName,
  searchProductsByID,
  listAllProducts,
};
