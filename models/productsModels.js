const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertProduct = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity}))
    .then((res) => res.ops[0]);
};

const findProduct = async (name) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const findProductById = async (id) => {
  return await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id)}));
};

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find({}).toArray());
};

const updateById = async (id, name, quantity) => {
  return connection()
    .then((db) => db.collection('products')
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            'name': name,
            'quantity': quantity,
          },
        },
      ))
    .then(() => ({ _id: ObjectId(id), name, quantity }));
};

const deleteById = async (id) => {
  return connection()
    .then((db) => db.collection('products')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  insertProduct,
  findProduct,
  getAllProducts,
  findProductById,
  updateById,
  deleteById,
};
