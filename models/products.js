const connection = require('./connection');
const { ObjectId } = require('mongodb');

const collection = 'products';

const getAll = async () => {
  return connection()
    .then((db) => db.collection(collection).find().toArray());
};

const findByName = async (name) => {
  return connection()
    .then((db) => db.collection(collection).findOne({'name': name}));
};

const findById = async (id) => {
  return connection()
    .then((db) => db.collection(collection).findOne(new ObjectId(id)));
};

const create = async (name, quantity) => {
  return connection()
    .then((db) => db.collection(collection).insertOne({ name, quantity }));
};

const update = async (id, name, quantity) => {
  return connection()
    .then(
      (db) => db.collection(collection)
        .updateOne({ _id: ObjectId(id) }, { $set: {name, quantity}}));
};

const remove = async (id) => {
  return connection()
    .then((db) => db.collection(collection).deleteOne({_id: ObjectId(id)}));
};

module.exports = { getAll, findByName, findById, create, update, remove };
