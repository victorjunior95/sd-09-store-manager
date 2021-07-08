const ServiceProducts = require('../services/ServiceProducts');

const CREATED = 201;
const SUCCESS = 200;

const create = async (req, res, next) => {
  const { name, quantity } = req.body;

  const createProduct = await ServiceProducts.create({ name, quantity });

  if (createProduct.err) {
    return next(createProduct.err);
  }

  return res.status(CREATED).json(createProduct);
};

const getAllOrById = async (req, res, next) => {
  const { id } = req.params;

  const findAllOrById = await ServiceProducts.getAllOrById(id);

  if (findAllOrById.err) {
    return next(findAllOrById.err);
  }

  res.status(SUCCESS).json(findAllOrById);
};

const editProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const editedProduct = await ServiceProducts.editProduct(id, { name, quantity });

  return res.status(SUCCESS).json(editedProduct);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const findAllOrById = await ServiceProducts.getAllOrById(id);

  if (findAllOrById.err) {
    return next(findAllOrById.err);
  }

  const deletedProduct = await ServiceProducts.deleteProduct(id);

  return res.status(SUCCESS).json(deletedProduct);
};

module.exports = {
  create,
  getAllOrById,
  editProduct,
  deleteProduct,
};
