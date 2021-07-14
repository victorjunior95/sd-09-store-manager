const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'sales';

const getAll = () => {
  return connection()
    .then((db) => db.collection(collection).find().toArray());
};

const findByName = (name) => {
  return connection()
    .then((db) => db.collection(collection).findOne({'name': name}));
};

const findById = (id) => {
  return connection()
    .then((db) => db.collection(collection).findOne(new ObjectId(id)));
};

const create = (itensSold) => {
  return connection()
    .then((db) => db.collection(collection).insertOne({ itensSold }));
};

const update = (id, itensSold) => {
  return connection()
    .then((db) => db.collection(collection).updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    ));
};

const remove = (id) => {
  return connection()
    .then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));
};
module.exports = {
  getAll,
  findByName,
  findById,
  create,
  update,
  remove,
};
