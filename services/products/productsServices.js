const productsModel = require('../../models/products/productsModel');
const validate = require('../../schemas/productsSchema');


const create = async (name, quantity) => {
  const validations = await validate(name, quantity);
  if (validations.message) return validations;

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
