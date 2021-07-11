const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((result) => result);
};

const getProductById = async (id) => {
  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .then((result) => result);
};

const insertProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity}))
    .then((result) => result.ops[0]);
};

const updateProduct = async (id, name, quantity) => {
  await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) }, { $set: { name: name, quantity: quantity } }
    ));

  const product = await getProductById(id);
  return product;
};

const deleteProduct = async (id) => {
  const product = await getProductById(id);

  const response = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  console.log(response);

  return product;
};


module.exports = {
  deleteProduct,
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
};
