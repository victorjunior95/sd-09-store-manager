const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (itensSold) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);

const getAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('sales')
    .findOne(ObjectId(id)));
};

const change = async (id, sales) => {
  if (!ObjectId.isValid(id)) {
    return null;
  } else {
    connection().then((db) => db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { sales } }),
    );
    return { _id: id, sales };
  }
};

module.exports = {
  // del,
  getAll,
  // findByName,
  getById,
  change,
  create,
};