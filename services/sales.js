const { Sale } = require('../models');
const { InvalidArgumentError, NotFoundError } = require('../errors');
const validations = require('../validations');

module.exports = {
  async create(payload) {
    payload.forEach(({ quantity }) => {
      try {
        // Anotação pra nào esquecer:
        // Gambi pra passar no teste pq a messagem de erro nas duas situações são diferentes
        // apesar de as situação de erro serem as mesmas x:
        validations.quantity(quantity);
      } catch (_err) {
        throw new InvalidArgumentError('Wrong product ID or invalid quantity');
      }
    });

    const sale = new Sale(payload);
    const response = await sale.create();

    if (!response) {
      throw new InvalidArgumentError('Wrong product ID or invalid quantity');
    }

    return response;
  },
  async getAll() {
    const sale = new Sale();
    const sales = await sale.getAll();

    return { sales };
  },
  async get(id) {
    const sale = new Sale();
    const response = await sale.get(id);

    if(!Object.keys(response).length) throw new NotFoundError('Sale');

    return response;
  },
};