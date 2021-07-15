const connection = require('./connection');

const addSale = async (body) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: body}));
};

module.exports = {
  addSale,
};
