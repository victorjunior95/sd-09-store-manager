const connection = require('./connection');

const sales = 'sales';

const add = async (itensSold) => {
  const response = (await (await connection())
    .collection(sales).insertOne({ itensSold }));

  return response.ops[0];
};


module.exports = {
  add,
};
