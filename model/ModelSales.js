const connection = require('./connection');
// const { ObjectId } = require('mongodb');


const create = async (itensSold) => {
  
  const connect = await connection();
  const createItensSold = await connect.collection('sales')
    .insertOne({ 'itensSold': [...itensSold]});

  return {
    _id: createItensSold.insertedId,
    itensSold: createItensSold.ops[0].itensSold,
  };
};

module.exports = {
  create,
};
