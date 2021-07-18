const connection = require('./connections');

const createSales = async (newSales) => {
  const result = await connection()
    .then((db) => db
      .collection('sales')
      .insertOne({ itensSold: newSales }));
  return result.ops[0];
};

module.exports = {
  createSales,
};
