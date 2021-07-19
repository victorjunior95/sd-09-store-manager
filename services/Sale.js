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

const getAll = async () => {
  const sales = await Sale.getAll();
  return { sales };
};

const findById = async (id) => {
  const sale = await Sale.findById(id);
  if (!sale) return { error: { code: 'not_found', message: 'Sale not found' } };
  return product;
};

const edit = async (id, itens) => {
  let invalid = validateSoldProducts(itens);
  if (invalid) return invalid;
  const existSale = await Sale.findById(id);
  if (!existSale) return { error:
    { code: 'invalid_data', message: 'Wrong id format' }
  };
  return await Sale.edit(id, itens);
};

module.exports = { create, getAll, findById, edit };
