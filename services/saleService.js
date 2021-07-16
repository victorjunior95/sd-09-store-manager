const saleModel = require('../models/saleModel');

let err = {
  code: 'invalid_data',
  message: ''
};

const checkQuantity = (quantity) => {
  const minimal = 1;
  if(quantity < minimal) return true;
  
  if(typeof quantity !== 'number') return true;
};

const validQuantity = (products) => {
  let testedQuantity = products.some(product => checkQuantity(product.quantity));
  if(testedQuantity) {
    err.message = 'Wrong product ID or invalid quantity';

    return { err };
  }
};

const createSale = async (products) => {
  const validSale = validQuantity(products);
  if(validSale) return validSale;
  

  const newSale = await saleModel.create(products);
  return newSale;
};

const salesList = async () => {
  const sales = await saleModel.showAll();
  return { sales };
};

module.exports = {
  createSale,
  salesList,
};