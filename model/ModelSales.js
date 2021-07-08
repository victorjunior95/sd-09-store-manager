const connection = require('./connection');
const { ObjectId } = require('mongodb');


const create = async (itensSold) => {
  
  const connect = await connection();
  const createItensSold = await connect.collection('sales')
    .insertOne({ 'itensSold': [...itensSold]});

  return {
    _id: createItensSold.insertedId,
    itensSold: createItensSold.ops[0].itensSold,
  };
};

const getAll = async () => {
  const connect = await connection();
  const findAll = await connect.collection('sales').find().toArray();

  return {
    sales: [ ...findAll ],
  };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const findSale = await connect.collection('sales').findOne({ _id: ObjectId(id) });

  return findSale;
};

module.exports = {
  create,
  getAll,
  getById,
};
