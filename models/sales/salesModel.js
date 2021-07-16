const { ObjectId } = require('mongodb');
const connection = require('../connection');

const findProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const createSales = async (productsSold) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: productsSold }));

  return {
    _id: insertedId,
    itensSold: productsSold,
  };
};

module.exports = {
  findProduct,
  createSales,
};
