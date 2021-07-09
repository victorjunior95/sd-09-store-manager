const ModelProducts = require('../model/ModelProducts');
const invalidData = require('../utils/errosFunctions');


const UNPROCESSABLE_ENTITY = 422;

const create = async ({ name, quantity }) => {

  const findName = await ModelProducts.getByName({ name });

  if (findName) throw invalidData
  ('invalid_data', 'Product already exists', UNPROCESSABLE_ENTITY);

  const createProduct = await ModelProducts.create({ name, quantity });

  return createProduct;
};

const getAllOrById = async (id) => {

  if (!id) {
    const findAllProducts = await ModelProducts.getAll();

    return findAllProducts;
  }

  const findProductById = await ModelProducts.getById(id);

  if (!findProductById) throw invalidData
  ('invalid_data', 'Wrong id format', UNPROCESSABLE_ENTITY);

  return findProductById;
};

const editProduct = async (id, { name, quantity }) => {
  const editedProduct = await ModelProducts.editProduct(id, { name, quantity });

  return editedProduct;
};

const deleteProduct = async (id) => {
  const deletedProduct = await ModelProducts.deleteProduct(id);

  return deletedProduct;
};

module.exports = {
  create,
  getAllOrById,
  editProduct,
  deleteProduct,
};
