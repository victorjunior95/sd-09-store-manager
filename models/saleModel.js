const connection = require('./connection');

const create = async (product) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold: [...product]}));

  return sale;
};

module.exports = {
  create,
};