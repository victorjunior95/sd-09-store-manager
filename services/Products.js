const Products = require('../models/Products');

const create = async (name, quantity) => {
  const existsProduct = await Products.findByName(name, quantity);

  if (existsProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
      code: 422,
    };
  }

  return await Products.create(name, quantity);
};

const getAll = async () => await Products.getAll();

const findById = async (id) => {
  const products = await Products.findById(id);

  if (!products) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      code: 422,
    };
  }

  return products;
};

const change = async (id, name, quantity) => {
  const products = await Products.change(id, name, quantity);

  if (!products) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Data is the same.',
      },
      code: 422,
    };
  }

  return products;
};

const exclude = async (id) => {
  const products = await Products.findById(id);
  const excludeProduct = await Products.exclude(id);

  if (!excludeProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      code: 422,
    };
  }

  return products;
};

module.exports = {
  create,
  getAll,
  findById,
  change,
  exclude,
};
