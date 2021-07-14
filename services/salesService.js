const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const validateQuantity = (quantity) => {
  const invalidQuantity = 0;
  if (quantity <= invalidQuantity || Number.isNaN(parseInt(quantity, 10))) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    };
  }
};

//for (const item of array) foi a escolha por conta da assincronicidade
const createSale = async (order) => {
  for (const product of order) {
    const validateId = await productsModel.getProductById(ObjectId(product.productId));
    if (!validateId) {
      throw {
        status: 422,
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      };
    }
    await validateQuantity(product.quantity);
  }
  const newSale = await salesModel.createSale(order);
  return {
    status: 200,
    newSale,
  };
};

module.exports = {
  createSale,
};
