const connection = require('./connection');

const generateSale = async (products) => {
  return connection()
    .then((db) => db.collection('products').insertMany({itensSold: [...products]})
      .then((result) => result.ops[0]));
};

module.exports = {
  generateSale,
};