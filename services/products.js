const { InvalidArgumentError } = require('../errors');
const { Product } = require('../models');

const NAME_MIN_LENGTH = 5;
const QUANT_MIN_AMOUNT = 1;

module.exports = {
  async create(payload) {
    const { name = '', quantity = '' } = payload;
    const nameIsValid = name && name.length >= NAME_MIN_LENGTH;
    const quantityIsValid = quantity >= QUANT_MIN_AMOUNT;

    if (!nameIsValid) {
      throw new InvalidArgumentError('"name" length must be at least 5 characters long');
    }
    if (typeof quantity !== 'number') {
      throw new InvalidArgumentError('"quantity" must be a number');
    }
    if (!quantityIsValid) {
      throw new InvalidArgumentError('"quantity" must be larger than or equal to 1');
    }

    const product = new Product();
    const products = await product.getAll();
    const repeatedName = products.some(({ name: dbName }) => dbName === name);

    if (repeatedName) throw new InvalidArgumentError('Product already exists');
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
  }
};
