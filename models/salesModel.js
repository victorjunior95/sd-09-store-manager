const connection = require('./mongoConnection');
// const { ObjectId } = require('mongodb');

const registerSales = async (productId, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ productId, quantity }));
  // .then((result) => result.ops[0]);

  return ({ _id: insertedId, itensSold: [{ productId, quantity }] });
};

module.exports = {
  registerSales,
};