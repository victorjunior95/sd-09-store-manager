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

//Substitui o método updateOne pelo findOneAndUpdate que verifiquei no PR https://github.com/tryber/sd-09-store-manager/blob/d6410b1d48737c7314824e66aa8dae42c78928b0/models/Product.js#L37
//Pesquisei sobre no Google para entender o funcionamento: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/

const updateProductInfo = async (updateInfo) => {
  const { id, productData } = updateInfo;
  const result = await connection()
    .then(db => db.collection('products').findOneAndUpdate({ _id: ObjectId(id) }, {
      $set: {
        name: productData.name,
        quantity: productData.quantity,
      }
    },
    { returnOriginal: false }
    ));
  return result;
};

module.exports = {
  createProduct,
  listAllProducts,
  getProductByName,
  getProductById,
  updateProductInfo,
};
