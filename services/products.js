const { InvalidArgumentError, NotFoundError } = require('../errors');
const { Product } = require('../models');
const validations = require('../validations');

module.exports = {
  async create(payload) {
    const product = new Product();
    const { name = '', quantity = '' } = payload;

    await validations.name(name);
    validations.quantity(quantity);

    return product.create(payload);
  },
  async getAll() {
    const product = new Product();
    const products = await product.getAll();

    return { products };
  },
  async get(id) {
    const product = new Product();
    const response = await product.get(id);

    if (!response) throw new InvalidArgumentError('Wrong id format');

    return response;
  },
  async update(payload) {
    const product = new Product();
    const { id, name, quantity } = payload;

    await validations.name(name, id);
    validations.quantity(quantity);

    const response = await product.update(payload);

    if(!response) {
      throw new InvalidArgumentError('Wrong id format');
    } else if (!Object.keys(response).length) {
      throw new NotFoundError('product');
    };

    return response;
  },
  async remove(id) {
    const product = new Product();

    const response = await product.remove(id);

    if(!response) {
      throw new InvalidArgumentError('Wrong id format');
    } else if (!Object.keys(response).length) {
      throw new NotFoundError('product');
    };

    return response;
  },
};
