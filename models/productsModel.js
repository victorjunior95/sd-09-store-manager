const connection = require('./connection');
const { ObjectId } = require('mongodb');
const response = require('../middlewares/responseCodes');

const getAllProducts = async () => {
  try {
    return connection()
      .then((db) => db.collection('products').find().toArray());
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
      .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
    if(foundProduct === null) throw new Error();
    return foundProduct;
  } catch (error) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: 'Wrong id format'
      }
    };
    return errorObj;
  }
};

const createNewProduct = async (name, quantity) => {
  const dbProducts = await getAllProducts();
  if (dbProducts.some((product) => product.name === name)) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: 'Product already exists'
      }
    };
    return errorObj;
  }
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => result.ops[0]);
};

const updateProduct = async (name, quantity, id) => {
  try {
    const updatedProduct = await connection()
      .then((db) => db.collection('products').updateOne(
        { _id: ObjectId(id)},
        { $set : { 'name': name, 'quantity': quantity } }
      ));
    return getProductById(id);
  } catch (error) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: 'Wrong id format'
      }
    };
    return errorObj;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
};
