const connection = require('./connection');
const { ObjectID } = require('mongodb');

const create = (product) => connection().then((db) =>
  db.collection('products').insertOne(product)).then(({ ops }) => ops[0]);

const getAll = () => connection().then((db) =>
  db.collection('products').find().toArray());

const getById = (id) => connection().then((db) =>
  db.collection('products').findOne(ObjectID(id)));

const getByName = (name) => connection().then((db) =>
  db.collection('products').findOne({ name }));

module.exports = { create, getAll, getById, getByName };