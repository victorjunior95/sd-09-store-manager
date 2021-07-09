const express = require('express');
const connection = require('./connections');

const createProduct = async(name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({name, quantity})) 
    .then((result) => {
      return {
        id: result.insertedId,
        name,
        quantity,
      };
    });

module.exports = {
  createProduct,
};