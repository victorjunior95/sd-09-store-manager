// Req 5
const connection = require('./connection');

const register = async(itensSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  const registerSale = { _id: insertedId, itensSold };
  return registerSale;
};

module.exports = {
  register,
};
