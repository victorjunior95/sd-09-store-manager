const productsModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');
const response = require('../middlewares/responseCodes');
// { "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }] }

const isProductValid = async ({ productId, quantity}) => {
  const minQuantity = 1;
  const dbProduct = await productsModel.getProductById(productId);
  if(dbProduct.err) return false;
  if(quantity < minQuantity) return false;
  return true;
};

const createNewSale = (sales) => {
  if (sales.some((sale) => isProductValid(sale))) {
    const errorObj = {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
    return errorObj;
  }
  return salesModel.createNewSale(sales);
};

module.exports = {
  createNewSale,
};