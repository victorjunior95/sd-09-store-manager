const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const findByName = async (name) => {
  let isThereProduct = false;

  await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((data) => (isThereProduct = data));

  if (isThereProduct) return true;

  return false;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const products = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)),
  );
  if(!products) return false;

  return products;
};

const createProduct = async (name, quantity) => {
  const newProduct = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return newProduct.ops[0];
};

const updateProduct = async (name, quantity, id) => {
  if (!ObjectId.isValid(id)) return false;

  const productUpdated = await connection().then((db) =>
    db.collection('products').updateOne({id: ObjectId(id)},{$set: {name, quantity}})
  );
  return true;
};

module.exports = {
  createProduct,
  findByName,
  getAll,
  findById,
  updateProduct
};
