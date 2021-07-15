const connection = require('./connection');
const { ObjectId } = require('mongodb');
const getUpdatedProduct = ({ _id, name, quantity }) => {
  return {
    _id,
    name,
    quantity
  };
};

const insertProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({
      name,
      quantity
    }))
    .then((result) => result.ops[0]);
};

const getByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').find({
      name
    }).toArray());
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('products').findOne({_id: ObjectId(id)}));
};

const updateProductById = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('products').updateOne({_id: ObjectId(id)}, {
      $set: { name, quantity }
    }))
    .then(() => getUpdatedProduct({ _id: id, name, quantity }));
};

const deleteOneProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('products').findOneAndDelete({_id: ObjectId(id)}));
};

module.exports = {
  insertProduct,
  getByName,
  getAll,
  getById,
  updateProductById,
  deleteOneProduct
};
