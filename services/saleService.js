const saleModel = require('../models/saleModel');
const helper = require('../helpers');

const createSale = async (products) => {
  const sale = await saleModel.createSale(products);
  if (helper.verifySaleQuantity(products[0].quantity)) {
    return helper.verifySaleQuantity(products[0].quantity);
  }
  return sale;
};

const getAllSales = async () => {
  const allSales = await saleModel.getAllSales();
  const sales = { sales: [...allSales] };
  return sales;
};

const getSaleById = async (id) => {
  const sale = await saleModel.getSaleById(id);
  if (sale === null) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  };
  return sale;
};


const updateSale = async (id, productId, quantity) => {
  const sale = await saleModel.updateSale(id, productId, quantity);
  const editedSale = {
    _id: sale._id,
    itensSold: [{productId: sale.productId, quantity: sale.quantity}]
  };

  if (helper.verifySaleQuantity(quantity)) return helper.verifySaleQuantity(quantity);

  return editedSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale
};
