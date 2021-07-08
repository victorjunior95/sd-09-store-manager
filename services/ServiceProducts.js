const ModelProducts = require('../model/ModelProducts');

const create = async ({ name, quantity }) => {

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

const editProduct = async (id, { name, quantity }) => {
  const editedProduct = await ModelProducts.editProduct(id, { name, quantity });

  return editedProduct;
};

module.exports = {
  create,
  getAllOrById,
  editProduct,
};
