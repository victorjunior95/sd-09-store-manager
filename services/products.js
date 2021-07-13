const Products = require('../models/products');
const { status, message, code } = require('../schema/status');

// Req 1 => Validação se o produto já não existe no BD antes de ser adicionado
const create = async (name, quantity) => {
  const existingProduct = await Products.findByName(name);
  if (existingProduct) {
    return {
      isError: true,
      status: status.unprocessable,
      code: code.invalidData,
      message: message.productExists,
    };
  };
  const createdProduct = await Products.create(name, quantity);
  return createdProduct;
};

// Req 2
const findAll = async () => {
  const products = await Products.findAll();
  return products;
};

// Req 2
const findById = async (id) => {
  const productById = await Products.findById(id);
  return productById;
};

module.exports = {
  create,
  findAll,
  findById
};
