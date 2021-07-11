const { Product } = require('../models');
const { InvalidArgumentError } = require('../errors');

const NAME_MIN_LENGTH = 5;
const QUANT_MIN_AMOUNT = 1;

const validateNameFormat = (name) => name && name.length >= NAME_MIN_LENGTH;
const validateRepetition = async (name, id) => {
  const product = new Product();
  const products = await product.getAll();

  return !id
    ? products.some(({ name: dbName }) => dbName === name)
    : products.some(({ name: dbName, _id: dbID }) => dbName === name && dbID === id);
};
const validateQuantFormat = (quantity) => quantity && quantity >= QUANT_MIN_AMOUNT;

module.exports = {
  async name (name, id) {
    const nameIsValid = validateNameFormat(name);
    if (!nameIsValid) {
      throw new InvalidArgumentError('"name" length must be at least 5 characters long');
    }

    const repeatedName = await validateRepetition(name, id);
    if (repeatedName) throw new InvalidArgumentError('Product already exists');
  },
  quantity (quantity) {
    const quantityIsValid = validateQuantFormat(quantity);

    if (typeof quantity !== 'number') {
      throw new InvalidArgumentError('"quantity" must be a number');
    }
    if (!quantityIsValid) {
      throw new InvalidArgumentError('"quantity" must be larger than or equal to 1');
    }
  },
};
