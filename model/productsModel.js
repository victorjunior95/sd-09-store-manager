// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const findByName = async (name) => {
  const connection = connect();
  const newProduct = await connection.collection('products').findOne({ name }) ;

  return Boolean(newProduct);
};

const register = async (name, quantity) => {
  const connection = connect();
  const newProduct = await connection.collection('products')
    .insertOne({ name, quantity });

  return newProduct.ops[0];
};

module.exports = {
  findByName,
  register,
};
