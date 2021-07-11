const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async(name, quantity) => {
  const newProduct = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  return {
    _id: newProduct.ops[0]._id,
    name,
    quantity,
  };
};

const findByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({name}));
  return product;
};

const findAllProducts = async () => {
  const product = await connection()
    .then((db) => db.collection('products').find().toArray());
  return {
    products: product,
  };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection()
    .then((db) => db.collection('products').findOne({_id: ObjectId(id)}));
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) => db.collection('products')
    .updateOne({_id: ObjectId(id) }, { $set: { name, quantity } }));
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const deleted = await connection()
    .then((db) => db.collection('products')
      .findOneAndDelete({_id: ObjectId(id)}));
  return deleted.value;
};

module.exports = {
  createProduct,
  findByName,
  findAllProducts,
  findById,
  updateProduct,
  deleteProduct,
};