// const express = require('express');
const { x } = require('joi');
const connection = require('./connections');

const createProduct = async (name, quantity) => {
  console.log('createProduct ok');
  await connection()
    .then((db) => {
      console.log('connection ok');
      db.collection('products').insertOne({ name, quantity });
    })
    .then((result) => ({ id: result.insertedId, name, quantity }));
};

module.exports = {
  createProduct,
};
