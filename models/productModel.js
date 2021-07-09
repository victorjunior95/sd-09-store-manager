const connections = require('./connections');
const { ObjectId } = require('mongodb');

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

const listAllProductsModel = async () => {
  const listProduct = await connections()
    .then((db) => db
      .collection('products')
      .find().toArray());
  return listProduct;
};

const productIdModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productId = await connections()
    .then((db) => db
      .collection('products')
      .findOne( new ObjectId(id)));

  return productId;
};


module.exports = {
  create,
  queryByName,
  listAllProductsModel,
  productIdModel,
};
// fazer as querys dos bancos de dados