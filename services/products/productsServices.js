const productsModel = require('../../models/products/productsModel');

/* const requestErrors = async () => {
  try {
    const products = await productsModel.getAll();
  } catch (error) {
    return { status: 422, code: 'invalid_data', message: errors.quantityNotNumber };
  }
}; */

const create = async (name, quantity) => {
  const produtc = await productsModel.searchProductName(name);
  console.log('product exists: ', produtc);
  if (produtc) {
    return { status: 422, code: 'invalid_data', message: 'Product already exists' };
  }
  const newProduct = await productsModel.createProducts(name, quantity);
  return { newProduct, status: 201 };
};

const findAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

module.exports = {
  create,
  findAll,
};
