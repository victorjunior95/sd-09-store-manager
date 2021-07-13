const salesModel = require('../model/salesModel');
const productModel = require('../model/productModel');

const newSale = async (items) => {
  const minQuantity = 0;
  items.forEach((item) => {
    // const idFound = await productModel.findProductById(item.productId);
    if (item.quantity <= minQuantity) throw {
      err: { 
        message: 'Wrong product ID or invalid quantity',
        code: 'invalid_data'
      }
    };
  });
  
  return await salesModel.createSale(items);
};

module.exports = { newSale };