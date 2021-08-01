const salesModel = require('../models/sales.model');
const productModel = require('../models/products.model');

const saleVerification = async ({ quantity, productId }) => {
  if(quantity < 1 || typeof(quantity) === 'string') return {
    status: 422,
    data: {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    }
  };

  const product = await productModel.getProductById(productId);

  if(product.quantity < quantity) return {
    status: 404,
    data: {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      }
    }
  };
};

const createSales = async (sales) => {
  let err;
  for (sale of sales) err = await saleVerification(sale);

  if(err) throw err;

  for (sale of sales) await productModel.saleProduct(sale);

  const createdSales = await salesModel.createSales(sales);
  return { status: 200, data: createdSales };
};

const getSalesList = async () => {
  const sales = await salesModel.listSales();

  return { status: 200, data: { sales } };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if(!sale) throw {
    status: 404,
    data: {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    }
  };

  return { status: 200, data: sale };
};

const updateSaleById = async (id, sales) => {
  let err;

  for (sale of sales) err = await saleVerification(sale);

  if(err) throw err;

  for (sale of sales) await productModel.saleProduct(sale);

  const updatedSales = await salesModel.updateSaleById(id, sales);

  return { status:200, data: updatedSales };
};

const deleteSaleById = async (id) => {
  const deletedSale = await salesModel.deleteSaleById(id);

  if(!deletedSale) throw {
    status: 422,
    data: {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    }
  };

  deletedSale.itensSold
    .forEach(async (item) => await productModel.cancelSaleProduct(item));

  return { status: 200, data: deletedSale };
};

module.exports = {
  createSales,
  getSalesList,
  getSaleById,
  updateSaleById,
  deleteSaleById
};
