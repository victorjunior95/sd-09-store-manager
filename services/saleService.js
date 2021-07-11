const saleModel = require('../models/saleModel');
const zero = 0;

const quantityIsValid = async (sales) => {
  const salesAll = await saleModel.listAllSalesModel(sales);

  if (salesAll <= zero || typeof salesAll !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  // const salesArray = await sales
  //   .find((sale) => sale.quantity <= zero || typeof sale.quantity !== 'number');
  // if (salesArray) {
  //   return {
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Wrong product ID or invalid quantity'
  //     }
  //   };
  // }
  // return true;
  // // if (!salesArray) {
  return salesAll ;
  // // }
};

quantityIsValid().then((r) => console.log(r));

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

const salesUpdateValidate = async (productId, quantity) => {
  if (productId <= zero) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
};

const deleteSales = async (id) => {
  const sale = await saleModel.excludeSaleModel(id);
  if (sale === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  }
};

module.exports = {
  quantityIsValid,
  listAllSales,
  salesId,
  salesUpdateValidate,
  deleteSales
};