const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getNewProduct = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => {
      return products.map(({ _id, name, quantity }) => {
        return ({
          _id,
          name,
          quantity,
        });
      });
    });
};

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const createProduct = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) },
        { $set: { name, quantity } }),
    )
    .then(() => ({ _id: id, name, quantity }));
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllProducts,
  createProduct,
  getNewProduct,
  getById,
  updateProduct,
  deleteProduct,
};