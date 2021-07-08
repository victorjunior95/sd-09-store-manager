const connection = require('./connection');

const create = async (product) => {
  const { name, quantity } = product;
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: result.ops[0]._id,
    name: result.ops[0].name,
    quantity: result.ops[0].quantity
  };
};

const findByName = async (name) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ 'name': name });
  return result;
};

module.exports = {
  create,
  findByName,
};