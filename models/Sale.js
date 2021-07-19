const connection = require('./connection');
const { ObjectId } = require('mongodb');

const formatSale = ({ intensSold, _id }) => {
  return {
    _id,
    intensSold
  };
};

const create = async (soldProducts) => {
  const db = await connection();
  const createNew = await db.collection('sales').insertOne({intensSold: soldProducts}); 
  const result = await createNew.ops[0];
  return formatSale(result);
};

module.exports = { create };
