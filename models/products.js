const connection = require('./connection');
const { ObjectId } = require('mongodb');

const postProduct = async (name, quantity) => {
  const prod = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

  return prod.ops[0];
  // console.log(prod);
};

const getAllProducts = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const findOne = async (name) => {
  const prod = await connection()
    .then((db) => db.collection('products').findOne({ 'name': name }));

  return prod;
};

const putProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  connection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );

  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

const validateQtd = async (id, qtd) => {
  return await connection().then((db) => db.collection('products')
    .updateMany(
      { _id: ObjectId(id) },
      { $inc: { quantity: - qtd } }
    ));
};

const ValidateSum = async (id, qtd) => {
  return await connection().then((db) => db.collection('products')
    .updateMany(
      { _id: ObjectId(id) },
      { $inc: { quantity: qtd } },
    ));
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  findOne,
  putProduct,
  deleteProduct,
  validateQtd,
  ValidateSum
};
