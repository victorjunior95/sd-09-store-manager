const connection = require('./connection');
const { ObjectID } = require('mongodb');

const create = async ({ name, quantity }) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((res) => res.ops[0]);

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getById = async ({ id }) => ObjectID.isValid(id) ? connection()
  .then((db) => db.collection('products').findOne(ObjectID(id))) : null;

const update = async ({ id, name, quantity }) => connection()
  .then((db) => db.collection('products').updateOne({ _id: ObjectID(id) },
    { name, quantity })).then((res) => res.ops[0]);

const remove = async ({ id }) => ObjectID.isValid(id) ? connection()
  .then((db) => db.collection('products').findOneAndDelete({ _id: ObjectID(id) }))
  .then((res) => res.value) : null;

module.exports = { create, getAll, getById, update, remove };
