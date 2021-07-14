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

// db.sales.updateOne(
//   { _id: ObjectId("60edc30a197392463ffb45c2")},
//   {$set:{"itensSold.$[element].quantity": 20}},
//   { arrayFilters: [{ "element.productId": "60ec38e0b913b56448e81ffb" }] });

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
