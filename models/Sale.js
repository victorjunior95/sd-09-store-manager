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

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const _id = ObjectId(id);
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({_id}));
  if (!sale) return null;
  return formatSale(sale);
};

const getAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find());
  const result = await sales.toArray();
  return result.map(formatSale);
};

module.exports = { create, findById, getAll };
