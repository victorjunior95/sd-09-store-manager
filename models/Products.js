const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then(result => result.ops[0]);

const findByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const listProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getProductById = async (_id) => connection()
  .then((db) => db.collection('products').findOne(new ObjectId(_id)));

const getProductByIdAndUpdate = async (_id, name, quantity) => connection()
  .then((db) => db.collection('products')
    .findOneAndUpdate({_id: ObjectId(_id)}, { $set: { name, quantity } }));



module.exports = {
  create,
  findByName,
  listProducts,
  getProductById,
  getProductByIdAndUpdate,
};
