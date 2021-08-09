const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { AppError, errorCodes} = require('../utils');

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

module.exports = {
  checkNameExists,
  createProduct,
  getById,
  getAll,
};
