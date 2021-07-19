// const express = require('express');
const connection = require('./connections');

const createProduct = async (productData) => {
  const { name, quantity } = productData;
  return await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }))
    .then(result => result.ops[0]);
};

const listAllProducts = async () => {
  return await connection()
    .then(db => db.collection('products').find().toArray());
};

const getProductByName = async (productData) => {
  const newName = productData.name;
  return await connection()
    .then(db => db.collection('products').findOne({ name: newName }));
};

module.exports = {
  createProduct,
  listAllProducts,
  getProductByName,
};
