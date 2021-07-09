const connection = require('./connection');
const { ObjectId } = require('mongodb');
const response = require('../middlewares/responseCodes');

const createNewSale = async (sales) => {
  try {
    const newSale = {
      _id: ObjectId(),
      itensSold: [
        sales.map(({ productId, quantity}) => {
          return {
            productId,
            quantity,
          };
        })
      ]
    };
    connection()
      .then((db) => db.collection('sales').insertOne(newSale));
    return newSale;

  } catch (error) {
    const errorObj = {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
    return errorObj;
  };
};

module.exports = {
  createNewSale,
};
