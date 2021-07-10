const Products = require('../models/Products');

const create = async (name, quantity) => {
  const existsProduct = await Products.findByName(name, quantity);

  if (existsProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return await Products.create(name, quantity);
};

module.exports = {
  create,
};
