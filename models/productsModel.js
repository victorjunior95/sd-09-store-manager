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
  const product = await getProductById(id);

  if(!product) return null;

  const result = await connection()
    .then((db) => db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, {$set: {name, quantity}}));
  return result.modifiedCount;
};

const updateProductWhenSold = async (saleArray) => {
  for ( const item of saleArray) {
    await connection().then((db) => db
      .collection('products')
      .updateOne({ _id: ObjectId(item.productId)}, {$inc: {quantity: -item.quantity}}));
  };
  return null;
};

const deleteProduct = async (id) => {
  const product = await getProductById(id);

  if(!product) return null;

  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id)}));
  return product;
};

const updateProductsWhenDeleted = async (itemSoldArray) => {
  for ( const item of itemSoldArray) {
    await connection().then((db) => db
      .collection('products')
      .updateOne({ _id: ObjectId(item.productId)}, {$inc: {quantity: item.quantity}}));
  };
  return null;
};

module.exports = {
  postNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct, 
  findProductByName,
  updateProductWhenSold,
  updateProductsWhenDeleted,
};
