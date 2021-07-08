const { ObjectId } = require('mongodb');
const connect = require('./connection');

const findByName = async (name) => {
  const connection = await connect();
  const newProduct = await connection.collection('products').findOne({ name }) ;

  return Boolean(newProduct);
};

const register = async (name, quantity) => {
  const connection = await connect();
  const newProduct = await connection.collection('products')
    .insertOne({ name, quantity });

  return newProduct.ops[0];
};

const list = async (_id) => {
  const connection = await connect();
  if (id) {
    try {
      const find = await connection.collection('products').findOne({
        _id: ObjectId(_id)
      });

      return find;
    } catch (err) {
      return;
    }
  }

  const productsList = await connection.collection('products').find().toArray();
  return productsList;
};

module.exports = {
  findByName,
  register,
  list
};
