const { ObjectId } = require('mongodb');
const connection = require('./connection');

const buyProduct = async (id, quantity) => {
  const result = await connection()
    .then((db) => db.collection('products')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        {$inc: { quantity: -quantity } },
        {returnOriginal: false}))
    .then((result) => result.value);

  return result;
};

const deleteSale = async (id, quantity) => {
  return connection()
    .then((db) => db.collection('products')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        {$inc: { quantity: quantity } },
        {returnOriginal: false}))
    .then((result) => result.value);
};

const deleteProduct = async (id) => {
  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

const updateProduct = async (id, name, quantity) => {
  return connection()
    .then((db) => db.collection('products')
      .findOneAndUpdate({_id: ObjectId(id)},
        { $set: {name, quantity}}, {returnOriginal: false}))
    .then((result) => result.value);
};

const getAllProducts = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));

  if (!product) return null;

  return product;
};

const findProductByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));

  if (!product) return null;

  return product;
};

const addProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
};



module.exports = {
  buyProduct,
  deleteSale,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  findProductByName,
  addProduct,
};
