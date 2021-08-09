const connection = require('./connection');
const { ObjectId } = require('mongodb');
const { AppError, errorCodes } = require('../utils');

const getAllSales = async () => {
  try {
    const db = await connection();
    return await db.collection('sales').find().toArray();
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const getSaleById = async (id) => {
  try {
    const db = await connection();
    return await db.collection('sales').findOne(new ObjectId(id));
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const createSale = async (sale) => {
  try {
    const db = await connection();
    return await db.collection('sales').insertOne(sale);
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const updateSale = async (id, newInfo) => {
  try {
    const db = await connection();
    const objectId = new ObjectId(id);
    const updatedSale = await db
      .collection('sales')
      .updateOne({ _id: objectId },{ $set: newInfo});
    return updateSale;
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

const deleteSale = async (id) => {
  try {
    const db = await connection();
    const sale = await db.collection('sales').findOne(new ObjectId(id));
    if (sale) {
      await db.collection('sales').deleteOne({ _id: ObjectId(id) });
    }
    return sale;
  } catch (error) {
    throw new AppError(errorCodes.DATABASE_ERROR, error);
  }
};

module.exports = {
  createSale,
  updateSale,
  deleteSale,
  getSaleById,
  getAllSales,
};
