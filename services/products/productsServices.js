const productsModel = require('../../models/products/productsModel');

const validate = (name, quantity) => {
  if (name.length < 5) return { status: 422, code: 'invalid_data', message: '"name" length must be at least 5 characters long' };
  if (quantity < 0) return { status: 422, code: 'invalid_data', message: '"name" length must be at least 5 characters long' };

  return {};
};

const create = async (name, quantity) => {
  const validations = validate(name, quantity);
  if (validations.message) return validations;

  // name deve ser uma string com mais de 5 caracteres
  // em caso de erro, status 422, code: invalid_data, message: '"name" length must be at least 5 characters long'

  // quantity deve ser um número inteiro maior que 0
  // em caso de erro, status 422, code: invalid_data, message: '"name" length must be at least 5 characters long'

  //

  const produto = await productsModel.searchProductName(name);
  if (produto) return { status: 422, code: 'invalid_data', message: 'Product already exists' };

  const newProduct = await productsModel.createProducts(name, quantity);
  // console.log(newProduct);
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
