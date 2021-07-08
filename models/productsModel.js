const connection = require('./connection');
const ObjectID = require('mongodb').ObjectID;

const getAllProducts = async () => {
  try {
    return connection()
      .then ((db) => db.collection('products').find().toArray());
  } catch (error) {
    return {
      error: error.status,
      message: error.message,
    };
  }
};

const getProductById = async (id) => {
  try {
    const foundProduct = await connection()
      .then((db) => db.collection('products').findOne({ _id: ObjectID(id)}));
    if (!foundProduct) throw new Error();
    return foundProduct;
  } catch (error) {
    return {
      error: 422,
      message: 'Wrong id format',
    };
  }
};

const addNewProduct = async ({ name, quantity }) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => result.ops[0]);
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};
