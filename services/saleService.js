const saleModel = require('../models/saleModel');
const zero = 0;

const itemSoldIsValid = (quantity) => {
  if(quantity <= zero || typeof quantity !== 'number' ) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
};

const createSales = async (itemSold) => {
  const validateSold = itemSoldIsValid(itemSold[0].quantity);
  const createProduct = await saleModel.create(itemSold);
  if (validateSold) return validateSold;
  return createProduct;
};

const listAllSales = async () => {
  const sales = await saleModel.listAllSalesModel();
  const allSales = { sales: [...sales] };

  return allSales;
};

const salesId = async (id) => {
  const saleId = await saleModel.saleAllModel(id);

  if (saleId === null) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  }
  return saleId;
};

const salesUpdate = async(id, productId, quantity) => {
  const salesUp = await saleModel.updateSales(id, productId, quantity);
  console.log('salesUpdate',salesUp);
  const saleUpdated =  {
    _id: salesUp._id,
    itensSold: [
      {
        productId: salesUp.productId,
        quantity: salesUp.quantity
      }
    ]
  };

  if (itemSoldIsValid(quantity)) {
    return itemSoldIsValid(quantity);
  }
  return saleUpdated;
};

const deleteSales = async (id) => {
  const sale = await saleModel.excludeSaleModel(id);
  if (sale === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    };
  }
  return sale;
};

module.exports = {
  listAllSales,
  salesId,
  salesUpdate,
  deleteSales,
  createSales
};