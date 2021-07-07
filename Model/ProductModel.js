const connection = require('../Helpers/connect');
const { ObjectId } = require('mongodb');

const getAllProducts = () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const findProductByName = (productName) => {
  return connection().then((db) => db.collection('products')
    .find({ name: productName }).toArray());
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateById = async (id, name, quantity) => {
  return connection()
    .then((db) =>
      db.collection('products')
        .updateOne({ _id: ObjectId(id) },
          { $set: { name, quantity } }),
    )
    .then(() => ({ _id: id, name, quantity }));
};

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));
};

const deleteProduct = async (id) => {
  console.log(id);
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .then((result) => ({ _id: result._id }));
};

module.exports = {
  getAllProducts,
  findById,
  createProduct,
  findProductByName,
  updateById,
  deleteProduct,
};
