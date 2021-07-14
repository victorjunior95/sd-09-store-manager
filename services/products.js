const Products = require('../models/products');
const { status, message, code } = require('../schema/status');

// Req 1 => Validação se o produto já não existe no BD antes de ser adicionado
const create = async (name, quantity) => {
  const existingProduct = await Products.findByName(name); //Confere se o produto existe no BD
  if (existingProduct) { return {
    isError: true,
    status: status.unprocessable,
    code: code.invalidData,
    message: message.productExists,
  };};
  
  // Se não cair no erro de produto existente ele será criado
  const createdProduct = await Products.create(name, quantity);
  return createdProduct;
};

// Req 2 => Função que vai acionar todos os produtos, na camada M
const findAll = async () => {
  const products = await Products.findAll();
  return products;
};

// Req 2 => Função que vai acionar produtos de acordo com o id, na camada M
const findById = async (id) => {
  const productById = await Products.findById(id);
  return productById;
};
// Req 3 => Função para trazer um produto 
const updateById = async (id, name, quantity ) => {
  const updateProduct = await Products.create(id, name, quantity);
  return updateProduct;
};
// Req 4
const deleteById = async (id) => {
  const deleteProduct = await Products.deleteById(id);
  return deleteProduct;
};

module.exports = {
  create,
  findAll,
  findById,
  updateById,
  deleteById
};
