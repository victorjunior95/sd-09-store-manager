const modelSales = require('../models/salesModel');
const modelProducts = require('../models/productsModel');

// should be a void function if everything runs fine
const updateProductsStock = async (op, itensSold) => {
  for (sell of itensSold) {
    const stock = await modelProducts.findById(sell.productId);
    let finalAmount;

    if (stock.quantity < sell.quantity) return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      }
    };

    switch (op) {
    case 'remove':
      finalAmount = stock.quantity - sell.quantity;
      break;
    case 'add':
      finalAmount = stock.quantity + sell.quantity;
      break;
    }

    await modelProducts.updateStockAmount(sell.productId, stock.name, finalAmount);
  }
};

const createSales = async (itensSold) => {
  const findProduct = itensSold.map(({ productId }) => modelProducts.findById(productId));
  const findProductResolve = await Promise.all(findProduct);
  const isNotFound = findProductResolve.some(product => !product);

  if (isNotFound) return {
    err: { 
      code: 'invalid_data',
      message: 'Product doesn\'t exist'
    }
  };

  const updateStock = await updateProductsStock('remove', itensSold);
  if (updateStock) return updateStock;

  const productsSales = await modelSales.setNew(itensSold);

  return productsSales;
};

const getAllSales = async () => {
  const findSales = await modelSales.getAll();

  return {
    'sales': [...findSales],
  };
};

const getSalesById = async (id) => {
  const findSales = await modelSales.findById(id);
  
  return findSales;
};

const deleteSalesById = async (id, itensSold) => {
  const updateStock = await updateProductsStock('add', itensSold);

  if (updateStock)return updateStock;

  await modelSales.deleteById(id);
};

const updateSalesById = async (id, quantity) => await modelSales.updateById(id, quantity);

module.exports = { 
  createSales, 
  getAllSales, 
  getSalesById, 
  updateSalesById, 
  deleteSalesById 
};
