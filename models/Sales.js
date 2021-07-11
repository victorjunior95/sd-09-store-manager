const connection = require('./connections');
const { ObjectId } = require('mongodb');

const create = async (array) => {
  const sales = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: array }),
  );

  return sales.ops;
};

module.exports = {
  create,
};
