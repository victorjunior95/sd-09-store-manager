const connection = require('./connection');

const addSale =  async (itensSold) => {
  const product = await connection()
    .then((db) => db.collection('sales').insertOne({itensSold}));
  return product.ops[0];
};

const findAllSales = async () => {
  const products = await connection()
    .then((db) => db.collection('sales').find().toArray());
  return products;
};

const findOneSale = async (id) => {
  const product = await connection()
    .then((db) => db.collection('sales').findOne({_id: id}));
  return product;
};

module.exports = {
  addSale,
  findAllSales,
  findOneSale,
};
