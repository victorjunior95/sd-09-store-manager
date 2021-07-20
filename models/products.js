// const express = require('express');
const connection = require('./connections');
const { ObjectId } = require('mongodb');

const createProduct = async (productData) => {
  const { name, quantity } = productData;
  return await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }))
    .then(result => result.ops[0]);
};

const listAllProducts = async () => {
  return await connection()
    .then(db => db.collection('products').find().toArray())
    .then((result) => result);
};

const getProductByName = async (productData) => {
  const newName = productData.name;
  return await connection()
    .then(db => db.collection('products').findOne({ name: newName }));
};

const getProductById = async (searchId) => {
  return await connection()
    .then(db => db.collection('products').findOne(ObjectId(searchId)));
};

module.exports = {
  createProduct,
  listAllProducts,
  getProductByName,
  getProductById,
};
