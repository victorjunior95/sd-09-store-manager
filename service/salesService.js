const salesModel = require('../model/salesModel');
const productService = require('../service/productService');

const minQuantity = 0;

const newSale = async (items) => {
  return Promise.all(
    items.map(async (item) => {
      const idFound = await productService.validateFoundId(item.productId);
      console.log(idFound);
      if (
        item.quantity <= minQuantity ||
        typeof item.quantity !== 'number' ||
        idFound.err
      ) throw {
        err: {
          message: 'Wrong product ID or invalid quantity',
          code: 'invalid_data'
        }
      };
    })
  ).then(() => salesModel.createSale(items));
};

module.exports = { newSale };