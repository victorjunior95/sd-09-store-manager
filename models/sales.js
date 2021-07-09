const connection = require('./connection');
const { ObjectID } = require('mongodb');

const create = async (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold }));

const getAll = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getById = async (id) => ObjectID.isValid(id) ? connection()
  .then((db) => db.collection('sales').findOne(ObjectID(id))) : null;

const update = async (id, itensSold) => connection()
  .then((db) => db.collection('sales').updateOne({ _id: ObjectID(id) },
    { $set: { itensSold } }));

const remove = async (id) => connection()
  .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectID(id) }));

const updateProducts = async (id, quantity) => connection()
  .then((db) => db.collection('products').updateOne({ _id: ObjectID(id) },
    { $inc: { quantity: quantity } }));

module.exports = { create, getAll, getById, update, remove, updateProducts };
