const { Sale } = require('../models');
const { InvalidArgumentError } = require('../errors');

module.exports = {
  async create(payload) {
    const sale = new Sale(payload);
    const response = await sale.create();

    if (!response) {
      throw new InvalidArgumentError('Wrong product ID or invalid quantity');
    }

    return response;
  },
};