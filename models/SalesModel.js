const connection = require('./connection');

const addSale =  async (itensSold) => {
  const product = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold}));
  return product.ops[0];
};

module.exports = {
  addSale,
};
