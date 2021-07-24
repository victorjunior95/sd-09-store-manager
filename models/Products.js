const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => {
      return {
        result: {
          _id: ObjectId(result.insertedId),
          name,
          quantity,
        },
        code: 201,
      };
    });
};

const getProductByName = async (name) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((data) => data);
  return product;
};

const getAllProducts = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray())
    .then((data) => {
      return {
        result: {
          products: data,
        },
        code: 200,
      };
    });
  return products;
};

const getProductById = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }))
    .then((data) =>{
      return {
        result: data,
        code: 200,
      };
    });
  return product;
};

const editProduct = async (id, name, quantity) => {
  return await connection()
    .then((db) => {
      db.collection('products')
        .updateOne({ _id: ObjectId(id) },{ $set: { name, quantity } });
    })
    .then(() => {
      return {
        result: {
          _id: id,
          name,
          quantity,
        },
        code: 200
      };
    });
};

const deleteProduct = async (id) => {
  const product = await getProductById(id);
  return await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .then((data) => {
      return product;
    });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByName,
  getProductById,
  editProduct,
  deleteProduct
};