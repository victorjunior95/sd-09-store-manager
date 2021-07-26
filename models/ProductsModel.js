const { ObjectId } = require('mongodb');
const connection = require('./connection');


const deleteProduct = async (id) => {
  const deleted = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  if (deleted) return deleted;
};

const updateProduct = async ({id, name, quantity}) => {
  const product = await connection()
    .then((db) => db.collection('products')
      .updateOne({_id: ObjectId(id)},
        { $set: {name, quantity}},));
  return product;
};

const getAllProducts = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());

  return {
    products: products
  };
};

const getProductById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
  return product;
};

const findProductByName = async ({name}) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));

  return product;
};

const addProduct = async ({name, quantity}) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));

  return product.ops[0];
};

const updateQuantity = async (id, quantity)  => {
  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { quantity } },
    ));
};

module.exports = {
  updateQuantity,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  findProductByName,
  addProduct,
};
