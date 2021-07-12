const Products = require('../models/Products');

const CODE_UNPROCESSABLE = 422;

const create = async (name, quantity) => {
  const existsProduct = await Products.findByName(name, quantity);

  if (existsProduct) {
    return err('invalid_data', 'Product already exists', CODE_UNPROCESSABLE);
  }

  return await Products.create(name, quantity);
};

const getAll = async () => await Products.getAll();

const findById = async (id) => {
  const products = await Products.findById(id);

  if (!products) {
    return err('invalid_data', 'Wrong id format', CODE_UNPROCESSABLE);
  }

  return products;
};

const change = async (id, name, quantity) => {
  const products = await Products.change(id, name, quantity);

  if (!products) {
    return err('invalid_data', 'Data is the same', CODE_UNPROCESSABLE);
  }

  return products;
};

const exclude = async (id) => {
  const products = await Products.findById(id);
  const excludeProduct = await Products.exclude(id);

  if (!excludeProduct) {
    return err('invalid_data', 'Wrong id format', CODE_UNPROCESSABLE);
  }

  return products;
};

const err = (code, message, codeNumber) => {
  return {
    err: {
      code,
      message,
    },
    code: codeNumber,
  };
};

module.exports = {
  create,
  getAll,
  findById,
  change,
  exclude,
};
