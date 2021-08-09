const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { AppError, errorCodes } = require('../utils');

const checkNameExists = async (_schema, data) => {
  try {
    const db = await connection();
    return !(await db.collection('products').findOne({ name: data }));
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const getAll = async () => {
  try {
    const db = await connection();
    return await db.collection('products').find().toArray();
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const getById = async (id) => {
  try {
    const db = await connection();
    return await db.collection('products').findOne(new ObjectId(id));
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const createProduct = async (product) => {
  try {
    const db = await connection();
    return await db.collection('products').insertOne(product);
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const updateProduct = async (id, newInfo) => {
  try {
    const db = await connection();
    const objectId = new ObjectId(id);
    const updatedProduct = await db
      .collection('products')
      .updateOne({ _id: objectId },{ $set: newInfo});
    return updateProduct;
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const deleteProduct = async (id) => {
  try {
    const db = await connection();
    const product = await db.collection('products').findOne(new ObjectId(id));
    if (product) {
      await db.collection('products').deleteOne({ _id: ObjectId(id) });
    }
    return product;
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

module.exports = {
  checkNameExists,
  createProduct,
  updateProduct,
  deleteProduct,
  getById,
  getAll,
};
