const mongodb = require('mongodb');
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findProductByName = async ({ name }) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne({name}));

  return result;
};

const postNewProduct = async ({ name, quantity }) => {
  const product = await findProductByName({name});

  if(product) return null;

  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return result.ops[0];
};

const getAllProducts = async () => {
  const result = await connection()
    .then((db) => db.collection('products').find().toArray());
  return {
    products: result
  };
};

const getProductById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  return result;
};

const updateProduct = async ({ id, name, quantity }) => {
  const result = await connection()
    .then((db) => db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, {$set: {name, quantity}}));
  return result.modifiedCount;
};

module.exports = {
  postNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,

};
