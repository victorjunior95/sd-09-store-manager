const connection = require('./connection');

const sales = 'sales';

const add = async (itensSold) => {
  const db = await connection();
  const response = await db.collection(sales).insertOne({ itensSold });

  return response.ops[0];
};


module.exports = {
  add,
};
