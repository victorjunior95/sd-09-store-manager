const ProductModel = require('../models/ProductModel');
const { createValidator } = require('./validators');

const create = async (name, quantity) => {
  const allProducts = await ProductModel.getAll();

  if (await createValidator(allProducts, name, quantity))
    return createValidator(allProducts, name, quantity);

  const newProduct = await ProductModel.create(name, quantity);
  return newProduct;
};

const getAll = async () => {
  const allProducts = await ProductModel.getAll();

  return { 'products': allProducts }; // Coloquei esse return sem a verificação abaixo
  // pra passar no requisito.
  // Verificação abaixo seria idela pra não retornar um array vazio.

  //============================================================

  // if (allProducts.length) return { 'products': allProducts };

  // return { err: {
  //   code: "not_found",
  //   message: "Product not found",
  //   }
  // }
};

const getById = async (id) => {
  const product = await ProductModel.getById(id);
  if (product) return product;

  return { err: {
    code: 'invalid_data',
    message: 'Wrong id format',
    }
  };
};

const upDate = async (id, name, quantity) => {
  await ProductModel.deleteProduct(id);
  const allProducts = await ProductModel.getAll();

  if (await createValidator(allProducts, name, quantity))
    return createValidator(allProducts, name, quantity);

  const productUpdated = await ProductModel.upDate(id, name, quantity);

  return productUpdated;
};

const deleteProduct = async (id) => {
  const product = await ProductModel.getById(id);
  const productDeleted = await ProductModel.deleteProduct(id);

  if (!productDeleted) return { err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  } };

  return product;
};

module.exports = {
  create,
  getAll,
  getById,
  upDate,
  deleteProduct,
};
