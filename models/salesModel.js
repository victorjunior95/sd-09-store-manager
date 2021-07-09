const connection = require('./connection');

const create = async (products) => {
  const db = await connection();
  const collection = await db.collection('sales');
  const itemSold = await collection.insertOne({'itensSold': [...products]});
  return {
    _id: itemSold.insertedId,
    itensSold: itemSold.ops[0].itensSold,
  };
};

module.exports = {
  create,
};
