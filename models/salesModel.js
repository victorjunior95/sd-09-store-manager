const connection = require('./connection');
const { ObjectId } = require('mongodb');
const response = require('../middlewares/responseCodes');

const getAllSales = async () => {
  try {
    return connection()
      .then((db) => db.collection('sales').find().toArray());
  } catch (error) {
    return {
      error: error.status,
      message: error.message,
    };
  }
};

const getSaleById = async (id) => {
  try {
    const foundSale = await connection()
      .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
    if(foundSale === null) throw new Error();
    return foundSale;
  } catch (error) {
    const errorObj = {
      err: {
        code:'not_found',
        message: 'Sale not found'
      }
    };
    return errorObj;
  }
};

const createNewSale = async (sales) => {
  try {
    const newSale = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold: sales }));
    return newSale.ops[0];
  } catch (error) {
    const errorObj = {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      },
    };
    return errorObj;
  };
};

const deleteSale = async (id) => {
  try {
    const deletedSale = await getSaleById(id);
    await connection().then((db) => db.collection('sales').deleteOne(
      { _id: ObjectId(id)}
    ));
    if(deletedSale === null) throw new Error();
    return deletedSale;
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
  getAllSales,
  getSaleById,  
  createNewSale,
  deleteSale,
};
