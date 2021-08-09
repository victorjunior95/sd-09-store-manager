const connection = require('./products');
const { ObjectId } = require('mongodb');

// https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/#mongodb-method-db.collection.insertOne
const postProduct = (name, quantity) => connection
  .then((db) => db.collection('products').insertOne({name, quantity}))
  .then(({ ops }) => ops[0]);

// https://docs.mongodb.com/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find
const getAllProducts = () => connection
  .then((db) => db.collection('products')
    .find().toArray()
  );

const getProductById = (id) => connection
  .then((db) => db.collection('products')
    .find(ObjectId(id))
  );

const getProductByName = (name) => connection
  .then((db) => db.collection('products')
    .find({name})
  );

// https://docs.mongodb.com/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update
const putProduct = (id, name, quantity) => connection
  .then((db) => db.collection('products')
    .update({ _id: ObjectId(id)}, { $set:{ name, quantity }})
  );

// We can use $inc instead of $set, using $inc will increase the value. For decrease use negative numbers
const putProductQuantity = (id, quantity) => connection
  .then((db) => db.collection('products')
    .update({_id: ObjectId(id)}, {$set: {quantity}})
  );

const deleteProduct = (id) => connection
  .then((db) => db.collection('products')
    .delete({_id: ObjectId(id)})
  );

module.exports = {
  postProduct,
  getAllProducts,
  getProductById,
  getProductByName,
  putProduct,
  putProductQuantity,
  deleteProduct,
};
