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


const change = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) return null; 
  connect().then((db) =>
    db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }),
  );
  return { _id: id, itensSold };
};
module.exports = {
  // del,
  getAll,
  // findByName,
  // getById,
  change,
  create,
};