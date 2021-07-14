const removeDBSale = require('../../models/sales/removeSale');
const findDBSale = require('../../models/sales/findSales');
const findProduct = require('../../models/products/findProduct');
const updateProduct = require('../../models/products/updateProduct');
const { invalidSaleId } = require('../utils/errorMessages');

const removeSale = async (id) => {
  try {
    const sale = await findDBSale(id);
    if(!sale) return { code: 'invalid_data', message: invalidSaleId };
    sale.itensSold.forEach(async (sell) => {
      const { name, quantity, _id } = await findProduct(sell.productId);
      const newProduct = { name, quantity: quantity + sell.quantity };
      await updateProduct(_id, newProduct);
    });
    await removeDBSale(id);
    return sale;
  } catch (error) {
    return { code: 'invalid_data', message: invalidSaleId };
  }
};

module.exports = removeSale;