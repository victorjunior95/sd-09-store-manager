const connection = require('./connection');

const create = async (itensSold) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);

const getAll = async () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

module.exports = {
  // del,
  getAll,
  // findByName,
  // getById,
  // change,
  create,
};