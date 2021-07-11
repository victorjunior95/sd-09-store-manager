const { InvalidArgumentError, NotFoundError } = require('../errors');
const { Product } = require('../models');
const validations = require('../validations');

module.exports = {
  async create(payload) {
    const product = new Product();
    const { name = '', quantity = '' } = payload;

    await validations.product.name(name);
    validations.product.quantity(quantity);

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

    const productDB = await product.get(id);

    if(!productDB) throw new NotFoundError('product');

    await validations.product.name(name, id);
    validations.product.quantity(quantity);

    return product.update(payload);
  }
};
