const salesModel = require('../models/Sales');
const DEFAULT = 0;

const updateStock = (products, type, oldQuantity = DEFAULT) => {
  if (type === 'create') {
    products.forEach((product) => {
      salesModel.updateStock(product.productId, -product.quantity);
    });
  }
  if(type === 'delete') {
    products.forEach((product) => {
      salesModel.updateStock(product.productId, product.quantity);
    });
  }
  if(type === 'edit') {
    products.forEach((product) => {
      const old = oldQuantity.forEach((item) => {
        return item.quantity - product.quantity;
      });
      salesModel.updateStock(product.productId, old);
    });
  }
};

const createSale = (sale) => {
  updateStock(sale, 'create');
  return salesModel.createSale(sale);
};

const getAllSales = () => salesModel.getAllSales();

const getSaleById = (id) => salesModel.getSaleById(id);

const editSale = async (id, sale) => {
  const oldSale = await salesModel.getSaleById(id);
  const { itensSold } = await oldSale.result;
  await updateStock(sale, 'edit', itensSold);
  return salesModel.editSale(id, sale);
};

const deleteSale = async (id) => {
  const sale = await salesModel.getSaleById(id);
  const { itensSold } = await sale.result;
  await updateStock(itensSold, 'delete');
  return salesModel.deleteSale(id);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,  
  editSale,
  deleteSale
};