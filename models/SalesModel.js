const connection = require('./connection');

const addSale =  async (arrayOfSoldProducts) => {
  const product = await connection()
    .then((db) => db.collection('sales').insertOne({arrayOfSoldProducts}));
  return product.ops[0];
};

module.exports = {
  addSale,
};
