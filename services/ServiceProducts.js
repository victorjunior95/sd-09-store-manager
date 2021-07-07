const ModelProducts = require('../model/ModelProducts');

const NAME_LENGTH = 5;
const MIN_QUANTITY = 1;

const create = async ({ name, quantity }) => {

  if (quantity < MIN_QUANTITY) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
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

  const createProduct = await ModelProducts.create({ name, quantity });

  return createProduct;
};

const getAllOrById = async (id) => {

  if (!id) {
    const findAllProducts = await ModelProducts.getAll();

    return findAllProducts;
  }

  const findProductById = await ModelProducts.getById(id);

  if (!findProductById) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return findProductById;
};

module.exports = {
  create,
  getAllOrById,
};
