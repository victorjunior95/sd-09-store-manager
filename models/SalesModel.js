const connection = require('./connection');

const createSales = (body) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: body }));
};

module.exports = {
  createSales
};
