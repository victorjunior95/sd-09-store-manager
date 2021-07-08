const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findAll = async () => {
  const products = await connection().then((db) => db.collection('products')
    .find().toArray());

  return { products: [...products] };
};

const findByName = async (name) => {
  const productName = await connection().then((db) => db.collection('products')
    .findOne({ name }));
  if (!productName) return null;
  return productName;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection().then((db) => db.collection('products')
    .findOne(ObjectId(id)));

  if (!product) return null;

  return product;
};

const create = async (name, quantity) => {
  const newProduct = await connection().then((db) => db.collection('products')
    .insertOne({ name, quantity }));
  return newProduct.ops[0];
};

module.exports = {
  findAll,
  findByName,
  findById,
  create,
};