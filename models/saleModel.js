const connection = require('./connection');

const create = async (product) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold: [...product]}));

  return sale.ops[0];
};

const showAll = async () => {
  const list = await connection()
    .then((db) => db.collection('sales').find({}).toArray());

  return list;
};

module.exports = {
  create,
  showAll,
};