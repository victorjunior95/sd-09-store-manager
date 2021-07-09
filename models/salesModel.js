const connection = require('../config/conn');

const salesRegister = async (sales) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: sales }));
  console.log(result.ops[0]);
  return result.ops[0];
};

module.exports = {
  salesRegister,
};
