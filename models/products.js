// const express = require('express');
const { x } = require('joi');
const connection = require('./connections');

const createProduct = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ id: result.insertedId, name, quantity }));
};

module.exports = {
  createProduct,
};
