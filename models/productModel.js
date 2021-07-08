const connections = require('./connections');

const create = async(name, quantity) => {
  const newProduct = await connections()
    .then((db) => db
      .collection('products')
      .insertOne({ name, quantity }))
    .then((result) => result.ops[0]);


  return newProduct;
};
const queryByName = async (name) => {
  const nameProduct = await connections()
    .then((db) => db
      .collection('products')
      .findOne({ name }));
  return nameProduct;
};

module.exports = { create, queryByName };
// fazer as querys dos bancos de dados