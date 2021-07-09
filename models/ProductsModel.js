const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return newProduct.ops[0];
};

const findProductName = async (name) => {
  const findProduct = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  return findProduct;
};

const getAll = async () => {
  const getAll = await connection()
    .then((db) => db.collection('products').find().toArray());

  return getAll;
};

const getById = async (id) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }

  const findProduct = await connection()
    .then((db) => db.collection('products').findOne({_id: ObjectId(id)}));

  return findProduct;
};

module.exports = {
  create,
  findProductName,
  getAll,
  getById,
};
