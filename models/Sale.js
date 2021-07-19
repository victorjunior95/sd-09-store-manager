const connection = require('./connection');
const { ObjectId } = require('mongodb');

const formatSale = ({ itensSold, _id }) => {
  return {
    _id,
    itensSold
  };
};

const create = async (soldProducts) => {
  const db = await connection();
  const createNew = await db.collection('sales').insertOne({itensSold: soldProducts}); 
  const result = await createNew.ops[0];
  return formatSale(result);
};

module.exports = { create };
