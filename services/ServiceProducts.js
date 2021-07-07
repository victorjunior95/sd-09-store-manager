const ModelProducts = require('../model/ModelProducts');

const NAME_LENGTH = 5;
const MIN_QUANTITY = 1;

const create = async ({ name, quantity }) => {
  if (name.length < NAME_LENGTH) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  const findName = await ModelProducts.getByName({ name });

  if (findName) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  if (quantity < MIN_QUANTITY) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }

  const createProduct = await ModelProducts.create({ name, quantity });

  return createProduct;
};

module.exports = {
  create,
};
