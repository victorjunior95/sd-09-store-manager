const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createNewProduct = async (name, quantity) => 
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));