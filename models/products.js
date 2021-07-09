const connection = require('./connection');

const create =  async (name, quantity) => {
  const newProduct =  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity}))
    .then((result) => result.ops[0]);

  return {
    _id: newProduct._id,
    name,
    quantity,
  };
};

const getByName = (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({ name }));
};
const getAll = () => {
  return connection()
    .then((db) => db.collection('produtcs').find().toArray());
};

module.exports = {
  create,
  getByName,
  getAll,
};