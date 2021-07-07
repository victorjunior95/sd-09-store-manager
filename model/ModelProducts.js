const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const connect = await connection();
  const createProduct = await connect.collection('products')
    .insertOne({ name, quantity });

  return {
    _id: createProduct.insertedId,
    name,
    quantity,
  };
};

const getByName = async ({ name }) => {
  const connect = await connection();
  const findName = connect.collection('products').findOne({ name });

  return findName;
};

module.exports = {
  create,
  getByName,
};
