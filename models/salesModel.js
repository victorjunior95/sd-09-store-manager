const connection = require('./connection');

// const generateSale = async (products) => {
//   await connection()
//     .then((db) => db.collection('products').insertOne({itensSold: [...products]})
//       .then((result) => result.ops[0]));
// };

const generateSale = async (products) => {
  const db = await connection();
  const collection = await db.collection('sales');
  const insertSale = await collection.insertOne({itensSold: [...products]});
  return insertSale.ops[0];
};

module.exports = {
  generateSale,
};