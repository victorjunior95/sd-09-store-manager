const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const Joi = require('joi');
const { ObjectId } = require('mongodb');
const response = require('../middlewares/responseCodes');
// { "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }] }

const minQuantity = 1;
const SALE_SCHEMA = Joi.object({
  quantity: Joi.number().min(minQuantity).required(),
});

const getAllSales = async () => {
  return salesModel.getAllSales();
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: 'Wrong id format'
      }
    };
    return errorObj;
  }
  return salesModel.getSaleById(id);
};

const validateSale = async (sales) => {
  const checkSales = await sales.map(async ({ quantity, productId }) => {
    const saleQuantity = SALE_SCHEMA.validate({ quantity });
    const productExists = await productsModel.getProductById(ObjectId(productId));
  
    if(saleQuantity.error || productExists.err) {
      const errorObj = {
        err: {
          err: {
            code: 'invalid_data',
            message: 'Wrong product ID or invalid quantity'
          },
        },
        code: response.INVALID_DATA,
      };
      throw errorObj;
    }
  });
  return Promise.all(checkSales);
};

const createNewSale = async (sales) => {
  const isSaleValid = await validateSale(sales);
  if(isSaleValid) return salesModel.createNewSale(sales);
};

module.exports = {
  getAllSales,
  getSaleById,
  createNewSale,
};