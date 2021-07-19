const Sale = require('../models/Sale');
const Product = require('../models/Product');

const validateSoldProducts = (soldProducts) => {
  const err = {
    error: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
  };
  let invalid = false;
  soldProducts.forEach((soldProduct) => {
    if (soldProduct.quantity < 1
      || typeof soldProduct.quantity == 'string'
      || !Product.findById(soldProduct.id) ) 
    {
      invalid = true;
    }
  });
  if (invalid) return err;
  return null;
};

const create = async (soldProducts) => {
  let invalid = validateSoldProducts(soldProducts);
  if (invalid) return invalid;
  return await Sale.create(soldProducts);
};

module.exports = { create };
