const { findByName, getByIdProduct } = require('../models/productsModel');

const UNPROCESSABLE_ENTITY_STATUS = 422;

function validNumber(newSale) {
  newSale.forEach((sale) => {
    if (typeof sale.quantity !== 'number') throw {
      status: UNPROCESSABLE_ENTITY_STATUS,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      } };
  });
};

function validQuantity(newSales) {
  newSales.forEach((sale) => {
    if (sale.quantity < 1) throw {
      status: UNPROCESSABLE_ENTITY_STATUS,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      } };
  });
};

module.exports = {
  validNumber,
  validQuantity,
};
