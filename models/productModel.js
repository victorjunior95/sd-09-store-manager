const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = (name) => {
  return connection().then((db) => db.collection('products').findOne({name}));
};

const addProduct = async ({name, quantity}) => {
  const result = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  
  return {
    _id: result.insertedId,
    name,
    quantity,
  };
};

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));
};

module.exports = {
  addProduct,
  findByName,
  getAllProducts,
  getProductById,
};
