const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSaleModel = async (salesToInsert) => {
  const salesCollection = await connection()
    .then((db) => db.collection('sales'));
  const { ops } = await salesCollection.insertOne({itensSold: salesToInsert});

  const sucssesSale = {
    _id: ops[0]._id,
    itensSold: ops[0].itensSold.map(({productId, quantity}) => (
      { productId, quantity }
    ))
  };

  return sucssesSale;
};

module.exports = {
  createSaleModel,
};