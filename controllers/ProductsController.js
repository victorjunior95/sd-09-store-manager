const rescue = require('express-rescue');

const productValidation = require('../services/productValidation');

const STATUS_CODE = {
  created: 201,
  ok: 200,
};

// Adiciona um novo produto
const addNewProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await productValidation.postValidateProduct(name, quantity);

  return newProduct.name
    ? res.status(STATUS_CODE.created).json(newProduct) 
    : next(newProduct);
});

// Lista todos os produtos
const getAllProducts = rescue(async (_req, res, _next) => {
  const allProducts = await productValidation.getAllProducts();

  return res.status(STATUS_CODE.ok).json({products: allProducts});
});

// Lista produto por id
const getProductById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const getById = await productValidation.getProductById(id);

  return getById.name
    ? res.status(STATUS_CODE.ok).json(getById)
    : next(getById);
});

// Atualiza um produto
const updateProduct = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await productValidation.updateProduct(id, name, quantity);

  return updatedProduct.name
    ? res.status(STATUS_CODE.ok).json(updatedProduct)
    : next(updatedProduct);
});

// Deleta um produto por id
const deleteProduct = rescue(async (req, res, next) => {
  const { id } = req.params;

  const deleteById = await productValidation.deleteProduct(id);

  return deleteById.name
    ? res.status(STATUS_CODE.ok).json(deleteById)
    : next(deleteById);
});

module.exports = {
  addNewProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
