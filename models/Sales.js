const connection = require('./connection');

const insertOneSale = async (productsSold) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: productsSold }))
    .then((sale) => sale.ops[0]);
};

module.exports = {
  insertOneSale
};
