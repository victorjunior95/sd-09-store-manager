const SalesModel = require('../models/SalesModel');

const minQuantity = 0;

const verifySaleQuantity = (sales) => {
  if (sales.some((item) => item.quantity <= minQuantity)) {
    throw {
      status: 422,
      error: {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      }
      
    };
  }
  if (sales.some((item) => typeof item.quantity === 'string')) {
    throw {
      status: 422,
      error: {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      }
    
    };
  } 
};

const validateSearch = async (id) => {
  const sale = await SalesModel.listOneSale(id);
  if (!sale) {
    throw {
      status: 404,
      error: {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        }
      }
    
    };
  }
};

const verifyById = async (id) => {
  const sale = await SalesModel.listOneSale(id);
  if (!sale) {
    throw {
      status: 422,
      error: {
        err: {
          code: 'invalid_data' ,
          message: 'Wrong sale ID format'
        }
      }
    };
  }
};

const salesProduct = async (sales) => {
  verifySaleQuantity(sales);
  const newSale = await SalesModel.salesProduct(sales);
  return newSale;
};

const listAllSales = async () => {
  const allSales = await SalesModel.listAllSales();
  return allSales;
};

const listOneSale = async (id) => {
  await validateSearch(id);
  const sale = await SalesModel.listOneSale(id);
  return sale;
};

const updateSale = async (id, sales) => {
  verifySaleQuantity(sales);
  const newSale = await SalesModel.updateSale(id, sales);
  return newSale;
};

const deleteSale = async (id) => {
  await verifyById(id);
  await validateSearch(id);
  const deletedSale = await SalesModel.deleteSale(id);
  return deletedSale;
};

module.exports = {
  salesProduct,
  listAllSales,
  listOneSale,
  updateSale,
  deleteSale,
};