const connection = require('./connection');
const { ObjectID } = require('mongodb');

const create = async ({ name, quantity }) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getById = async (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectID(id)));

const update = async ({ id, name, quantity }) => connection()
  .then((db) => db.collection('products').updateOne({ _id: ObjectID(id) },
    { name, quantity }));

const remove = async (id) => connection()
  .then((db) => db.collection('products').findOneAndDelete({ _id: ObjectID(id) }));

module.exports = { create, getAll, getById, update, remove };
