const modelSales = require('../models/sales');
const productModel = require('../models/product');

const zero = 0;
const updateStock = (products, type, oldQuantity = zero) => {
  if (type === 'create') {
    products.forEach((product) => {
      modelSales.updateStock(product.productId, -product.quantity);
    });
  }
  if(type === 'delete') {
    products.forEach((product) => {
      modelSales.updateStock(product.productId, product.quantity);
    });
  }
  if(type === 'edit') {
    products.forEach((product) => {
      const old = oldQuantity.forEach((item) => {
        return item.quantity - product.quantity;
      });
      modelSales.updateStock(product.productId, old);
    });
  }
};

const create = async(sale) => {
    
  updateStock(sale, 'create');
  return modelSales.create(sale);
};

const getAllSales = async() => {
  const sale = await modelSales.getAllSales();
  return sale;
};

const getSalesId = async(_id) => {
  const findId = await modelSales.getIdSales(_id);
  return findId;
};

const editSale = async (_id, sale) => {
  const oldSale = await modelSales.getIdSales(_id);
  const { itensSold } = await oldSale;
  await updateStock(sale, 'edit', itensSold);
  const editSale = await modelSales.editSale(_id, sale);
  return editSale;
};

const deleteSale = async(_id) => {
  const sale = await modelSales.getIdSales(_id);
  const { itensSold } = await sale;
  await updateStock(itensSold, 'delete');
  const deleteSale = await modelSales.deleteSale(_id);
  return deleteSale;
};

module.exports = { create, getAllSales, getSalesId, editSale, deleteSale };
