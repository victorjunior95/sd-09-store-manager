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
const getAllProducts = rescue(async (req, res, _next) => {
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

module.exports = {
  addNewProduct,
  getAllProducts,
  getProductById,
};
